var converter = new showdown.Converter({ tables: true });

function getTurndownOptions() {
  return {
    headingStyle: document.getElementById('headingStyle').value,
    bulletListMarker: document.getElementById('bulletListMarker').value,
    codeBlockStyle: document.getElementById('codeBlockStyle').value,
    emDelimiter: document.getElementById('emDelimiter').value,
    strongDelimiter: document.getElementById('strongDelimiter').value,
    linkStyle: document.getElementById('linkStyle').value,
    preformattedCode: document.getElementById('preformattedCode').value === 'true'
  };
}

function savePreferences() {
  var options = getTurndownOptions();
  localStorage.setItem('turndownOptions', JSON.stringify(options));
}

function loadPreferences() {
  var savedOptions = localStorage.getItem('turndownOptions');
  if (savedOptions) {
    savedOptions = JSON.parse(savedOptions);
    for (var key in savedOptions) {
      var element = document.getElementById(key);
      if (element) {
        element.value = savedOptions[key];
      }
    }
    return savedOptions;
  } else {
    return {
      headingStyle: 'atx',
      bulletListMarker: '-',
      codeBlockStyle: 'fenced',
      emDelimiter: '*',
      strongDelimiter: '**',
      linkStyle: 'inlined',
      preformattedCode: false
    };
  }
}

function addCustomRules(turndownService) {
  turndownService.addRule('nestedList', {
    filter: ['ul', 'ol'],
    replacement: function (content, node, options) {
      var output = '';
      var indentLevel = -1;

      function processList(node, indentLevel) {
        var listItems = node.childNodes;
        var result = '';
        indentLevel++;

        for (var i = 0; i < listItems.length; i++) {
          var listItem = listItems[i];

          if (listItem.nodeName === 'LI') {
            var prefix = '';
            if (node.nodeName === 'OL') {
              prefix = '1. ';
            } else {
              prefix = options.bulletListMarker + ' ';
            }

            var indent = '    '.repeat(indentLevel);

            var itemContent = '';

            for (var j = 0; j < listItem.childNodes.length; j++) {
              var child = listItem.childNodes[j];

              if (child.nodeName === 'OL' || child.nodeName === 'UL') {
                itemContent += '\n' + processList(child, indentLevel);
              } else {
                itemContent += turndownService.turndown(child.outerHTML || child.textContent);
              }
            }

            result += indent + prefix + itemContent.trim().replace(/\n/g, '\n' + indent + '    ') + '\n';
          }
        }
        return result;
      }

      output = processList(node, indentLevel);
      return output;
    }
  });

  turndownService.addRule('tables', {
    filter: function (node) {
      return node.nodeName === 'TABLE';
    },
    replacement: function (content, node) {
      var table = [];
      var rows = node.querySelectorAll('tr');
      rows.forEach(function (row, rowIndex) {
        var cells = row.querySelectorAll('td, th');
        var rowContent = Array.from(cells).map(function (cell) {
          return cell.textContent.trim();
        }).join(' | ');

        if (rowIndex === 0) {
          var headerSeparator = Array.from(cells).map(function () {
            return '---';
          }).join(' | ');
          table.push(rowContent);
          table.push(headerSeparator);
        } else {
          table.push(rowContent);
        }
      });

      return '\n\n' + table.join('\n') + '\n\n';
    }
  });
}

var initialOptions = loadPreferences();
var turndownService = new TurndownService(initialOptions);
addCustomRules(turndownService);

var markdownEditor = document.getElementById('markdownEditor');
var htmlEditor = document.getElementById('htmlEditor');
var htmlOutput = document.getElementById('htmlOutput');
var isUpdating = false;

function updateHTML() {
  if (isUpdating) return;
  isUpdating = true;
  var markdownText = markdownEditor.value;
  var html = converter.makeHtml(markdownText);
  htmlEditor.value = html;
  htmlOutput.innerHTML = html;
  isUpdating = false;
}

function updateMarkdown() {
  if (isUpdating) return;
  isUpdating = true;
  var htmlText = htmlEditor.value;
  turndownService = new TurndownService(getTurndownOptions());
  addCustomRules(turndownService);
  var markdown = turndownService.turndown(htmlText);
  markdownEditor.value = markdown;
  htmlOutput.innerHTML = htmlText;
  isUpdating = false;
}

markdownEditor.addEventListener('input', updateHTML);
htmlEditor.addEventListener('input', updateMarkdown);

var optionElements = document.querySelectorAll('.option select');
optionElements.forEach(function (element) {
  element.addEventListener('change', function () {
    savePreferences();
    updateMarkdown();
  });
});

updateHTML();

function copyMarkdown() {
  navigator.clipboard.writeText(markdownEditor.value).catch(err => {
    console.error('Error while copying Markdown: ', err);
  });
}

function copyHTML() {
  navigator.clipboard.writeText(htmlEditor.value).catch(err => {
    console.error('Error while copying HTML: ', err);
  });
}

function copyPreview() {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlOutput.innerHTML;
  document.body.appendChild(tempDiv);
  const range = document.createRange();
  range.selectNodeContents(tempDiv);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Error while copying Preview: ', err);
  }
  selection.removeAllRanges();
  document.body.removeChild(tempDiv);
}

function pasteClipboard() {
  navigator.clipboard
    .read()
    .then(items => {
      let clipboardHTML = null;
      let clipboardText = null;
      for (const item of items) {
        if (item.types.includes('text/html')) {
          item.getType('text/html').then(blob => {
            blob.text().then(html => {
              clipboardHTML = html;
              convertAndInsert(clipboardHTML, true);
            });
          });
        } else if (item.types.includes('text/plain')) {
          item.getType('text/plain').then(blob => {
            blob.text().then(text => {
              clipboardText = text;
              if (!clipboardHTML) {
                convertAndInsert(clipboardText, false);
              }
            });
          });
        }
      }
    })
    .catch(err => {
      console.error('Error while importing clipboard:', err);
    });
}

function convertAndInsert(content, isHTML) {
  var initialOptions = loadPreferences();
  var turndownService = new TurndownService(initialOptions);
  addCustomRules(turndownService);

  let markdown = '';
  if (isHTML) {
    markdown = turndownService.turndown(content);
  } else {
    markdown = content;
  }
  insertIntoEditor(markdown);
}

function insertIntoEditor(markdown) {
  var markdownEditor = document.getElementById('markdownEditor');
  markdownEditor.value += markdown;
  updateHTML();
}

function toggleMode() {
  document.body.classList.toggle('dark-mode');
}
