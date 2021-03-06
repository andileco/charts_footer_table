/**
 * @file
 * JavaScript file to convert chart attributes into an HTML table.
 */

(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.buildChartFooterTable = {
    attach: function (context, settings) {

      // The ID of the chart generated by the view.
      let chartId = drupalSettings.id;
      let chart = document.getElementById(chartId);
      let chartAttributes = JSON.parse(chart.getAttribute('data-chart'));
      let rows = chartAttributes.series;
      let categories = chartAttributes.xAxis.categories;

      // let columnHeaders = rows.map(rows => rows.name);
      let tableRows = [];
      for (let i = 0; i < categories.length; i++) {
        let tableRow = {};
        for (let j = 0; j < rows.length; j++) {
          tableRow['Category'] = categories[i];
          tableRow[rows[j]['name']] = rows[j]['data'][i];
          tableRows[i] = tableRow;
        }
      }

      // The following is closely based on
      // https://stackoverflow.com/a/21065846/9415060
      let _table_ = document.createElement('table'),
          _caption_ = document.createElement('caption'),
          _thead_ = document.createElement('thead'),
          _tbody_ = document.createElement('tbody'),
          _tr_ = document.createElement('tr'),
          _th_ = document.createElement('th'),
          _td_ = document.createElement('td');

      // Builds the HTML Table out of myList json data from Ivy restful service.
      function buildHtmlTable(arr) {
        // Create the table tag
        let table = _table_.cloneNode(false);
        // Creat the caption using the chart title (if it exists).
        let caption = _caption_.cloneNode(false);
        if (chartAttributes.title.text) {
          caption.textContent += 'Table for ' + chartAttributes.title.text;
        }
        else {
          caption.textContent += 'Table for the chart.';
        }
        table.appendChild(caption);
        // Create the header row (columns)
        let columns = addAllColumnHeaders(arr, table);
        // Create tbody
        let tbody = _tbody_.cloneNode(false);
        // Create row
        for (let i = 0, maxi = arr.length; i < maxi; ++i) {
          let tr = _tr_.cloneNode(false);
          for (let j = 0, maxj = columns.length; j < maxj; ++j) {
            let td = _td_.cloneNode(false);
            let cellValue = arr[i][columns[j]];
            td.appendChild(document.createTextNode(arr[i][columns[j]] || ''));
            if (j > 0) {
              td.setAttribute('class','number');
            }
            else {
              td.setAttribute('class','text');
              td.setAttribute('scope','row');
            }
            tr.appendChild(td);
          }
          tbody.appendChild(tr);
        }
        table.appendChild(tbody);
        return table;
      }

      // Adds a header row to the table and returns the set of columns.
      // Need to do union of keys from all records as some records may not contain
      // all records.
      function addAllColumnHeaders(arr, table) {
        let columnSet = [],
            thead = _thead_.cloneNode(false),
            tr = _tr_.cloneNode(false);
        for (let i = 0, l = arr.length; i < l; i++) {
          for (let key in arr[i]) {
            if (arr[i].hasOwnProperty(key) && columnSet.indexOf(key) === -1) {
              columnSet.push(key);
              let th = _th_.cloneNode(false);
              th.appendChild(document.createTextNode(key));
              th.setAttribute('scope','col');
              th.setAttribute('class','text');
              th.setAttribute('style','word-break: break-word;');
              tr.appendChild(th);
            }
          }
        }
        thead.appendChild(tr);
        table.appendChild(thead);
        return columnSet;
      }

      // Add a table within the div generated by the area handler.
      $('#'+ chartId+'-table', context).once('generate-table').each(function () {
        this.appendChild(buildHtmlTable(tableRows));
      });
    }
  };
})(jQuery, Drupal, drupalSettings);