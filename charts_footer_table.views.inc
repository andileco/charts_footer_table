<?php

function charts_footer_table_views_data() {
  $data['charts_footer_table']['table']['group'] = t('Global');
  $data['charts_footer_table']['table']['join'] = [
    // #global is a special flag which allows a table to appear all the time.
    '#global' => [],
  ];
  $data['charts_footer_table']['area'] = [
    'title' => t('Charts Footer Table'),
    'help' => t('Creates a table from the Chart.'),
    'area' => [
      'id' => 'charts_footer_table',
    ],
  ];

  return $data;

}
