<?php
  $active_class = $single_post && $single_post == $post ? 'active' : '';

  echo '<div class="home__post-title-wrapper '.$active_class.'">';
    echo '<a class="home__post-title-link" href="'.get_permalink().'" data-post-id="'.$post->ID.'" data-title="'.get_the_title().'">';
      echo '<div class="home__post-title">';
        the_title();
      echo '</div>';
      echo '<span class="home__post-category">';
        echo 'TODO: add category';
      echo '</span>';
    echo '</a>';
    $image = get_field('featured_image');
    if(isset($image)) {
      $url = $image['sizes']['large'];
      echo '<div class="home__post-image" style="background-image: url('.$url.');" ></div>';
    }
  echo '</div>';
?>
