<?php $active_class = $single_post && $single_post == $post ? 'active' : ''; ?>

<div class="grid-item one-third home__post-title-wrapper--grid <?php echo $active_class; ?>">
  <a class="home__post-title-link home__post-title-link--grid-mode" href="<?php the_permalink(); ?>?grid" <?php echo 'data-post-id="'.$post->ID.'" data-title="'.get_the_title().'"' ?> data-color-scheme="<?php echo get_field('color_scheme'); ?>">
    <?php
      $image = get_field('featured_image');
      if(isset($image)) {
        $url = $image['sizes']['large'];
        echo '<div class="home__post-image home__post-image--grid" style="background-image: url('.$url.');" ></div>';
      }
    ?>
    <?php sandbox_image('featured_image', 'medium', 'home__post-grid-image'); ?>
    <div class="grid-item__title">
      <?php the_title(); ?>
    </div>
    <div class="grid-item__category">
      TODO: add category
    </div>
  </a>
</div>
