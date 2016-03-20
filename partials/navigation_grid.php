<?php $active_class = $single_post && $single_post == $post ? 'js-active' : ''; ?>

<div class="home-page-nav-item grid-item col-sm-4 home__post-title-wrapper--grid <?php echo $active_class; ?>">
  <a class="home__post-title-link home__post-title-link--grid-mode" href="<?php the_permalink(); ?>?grid" <?php echo 'data-post-id="'.$post->ID.'" data-title="'.get_the_title().'"' ?> data-color-scheme="<?php echo get_field('color_scheme'); ?>">
    <?php
      $image = get_field('featured_image');
      if(isset($image)) {
        $url = $image['sizes']['large'];
        echo '<div class="home__post-image home__post-image--grid" data-background-image="'.$url.'"></div>';
      }
    ?>
    <?php sandbox_image('featured_image', 'medium', 'home__post-grid-image'); ?>
  </a>
  <div class="grid-item__title">
    <a class="home__post-title-link home__post-title-link--grid-mode" href="<?php the_permalink(); ?>?grid" <?php echo 'data-post-id="'.$post->ID.'" data-title="'.get_the_title().'"' ?> data-color-scheme="<?php echo get_field('color_scheme'); ?>">
      <?php the_title(); ?>
    </a>
  </div>
  <div class="grid-item__category">
    <?php
      $cats = array();
      foreach(wp_get_post_categories($post->ID) as $c) {
        $cat = get_category($c);
        array_push($cats, $cat->name);
      }

      if(sizeOf($cats) > 0) {
        $post_categories = implode(', ',$cats);
      }

      echo $post_categories;
    ?>
  </div>
</div>
