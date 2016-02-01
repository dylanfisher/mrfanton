<?php
  $active_class = $single_post && $single_post == $post ? 'active' : '';

  echo '<div class="home__post-title-wrapper '.$active_class.'">';
    echo '<a class="home__post-title-link" href="'.get_permalink().'" data-post-id="'.$post->ID.'" data-title="'.get_the_title().'" data-color-scheme="'.get_field('color_scheme').'">';
      echo '<div class="home__post-title">';
        the_title();
      echo '</div>';
      echo '<span class="home__post-category">';
        $cats = array();
        foreach(wp_get_post_categories($post->ID) as $c) {
          $cat = get_category($c);
          array_push($cats, $cat->name);
        }

        if(sizeOf($cats) > 0) {
          $post_categories = implode(', ',$cats);
        }

        echo $post_categories;
      echo '</span>';
    echo '</a>';
    $image = get_field('featured_image');
    if(isset($image)) {
      $url = $image['sizes']['large'];
      echo '<div class="home__post-image"><div class="home__post-image__inner" style="background-image: url('.$url.');"></div></div>';
    }
  echo '</div>';
?>
