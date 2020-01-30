<?php

namespace Drupal\charts_footer_table\Plugin\views\area;


use Drupal\Core\Form\FormStateInterface;
use Drupal\views\Plugin\views\area\AreaPluginBase;

/**
 * Area handler that creates a table of the chart
 *
 * @ingroup views_area_handlers
 * @ViewsArea("charts_footer_table")
 */
class ChartsFooterTable extends AreaPluginBase {

  /**
   * {@inheritdoc}
   */
  protected function defineOptions() {
    $options = parent::defineOptions();

    return $options;
  }

  /**
   * {@inheritdoc}
   */
  public function buildOptionsForm(&$form, FormStateInterface $form_state) {
    parent::buildOptionsForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
//  public function preQuery() {
//  }

  /**
   * {@inheritdoc}
   */
    public function query() {}

  /**
   * {@inheritdoc}
   */
  public function render($empty = FALSE) {
    $chart_id = $this->view->id() . '__' . $this->view->current_display;
    if (!$empty || !empty($this->options['empty'])) {
      $build = [];
      $build['charts_table_footer'] = [
        '#type' => 'inline_template',
        '#template' => '<div id="' . $chart_id . '-table" class=""></div>',
        '#context' => [
          'id' => $chart_id . '-table'
        ]
      ];
      $build['charts_table_footer']['#attached']['library'][] = 'charts_footer_table/standard_table';
      $build['charts_table_footer']['#attached']['drupalSettings']['id'] = $chart_id;

      return $build;
    }
    return [];
  }

}