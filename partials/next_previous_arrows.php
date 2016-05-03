<?php
  if( get_adjacent_post(false, '', true) ) {
    echo '<span class="control-button previous-button">';
      previous_post_link('<span class="previous-button__post-name next-prev-button__post-name">%link</span><span class="next-previous-button__post-label">'.get_template_part('images/svg/left-arrow.svg').'</span>');
    echo '</span>';
  } else {
    $first = new WP_Query('posts_per_page=1&order=DESC'); $first->the_post();
    echo '<span class="control-button previous-button">';
      echo '<span class="previous-button__post-name next-prev-button__post-name"><a href="' . get_permalink() . '">'.get_the_title().'</a></span><span class="next-previous-button__post-label">'.get_template_part('images/svg/left-arrow.svg').'</span>';
    echo '</span>';
    wp_reset_query();
  };

  if( get_adjacent_post(false, '', false) ) {
    echo '<span class="control-button next-button">';
      next_post_link('<span class="next-button__post-name next-prev-button__post-name">%link</span><span class="next-previous-button__post-label">'.get_template_part('images/svg/right-arrow.svg').'</span>');
    echo '</span>';
  } else {
    $last = new WP_Query('posts_per_page=1&order=ASC'); $last->the_post();
    echo '<span class="control-button next-button">';
      echo '<span class="next-button__post-name next-prev-button__post-name"><a href="' . get_permalink() . '">'.get_the_title().'</a></span><span class="next-previous-button__post-label">'.get_template_part('images/svg/right-arrow.svg').'</span>';
    echo '</span>';
    wp_reset_query();
  };
?>

