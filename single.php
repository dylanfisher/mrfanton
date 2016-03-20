<?php get_header() ?>
  <?php the_post() ?>

  <?php get_template_part('partials/navigation') ?>

  <div class="row">
    <div id="ajax-wrapper" class="ajax-wrapper">
      <div id="ajax-wrapper__featured-image" class="ajax-wrapper__featured-image">
        <?php
          $image = get_field('featured_image');
          if(isset($image)) {
            $url = $image['sizes']['large'];
            echo '<div class="featured-image-as-background" style="background-image: url('.$url.');"></div>';
            echo '<img class="featured-image-for-mobile" src="'.$url.'">';
          }
        ?>
      </div>
      <div id="ajax-wrapper__post" class="ajax-wrapper__post">
        <div class="content single-post-content" data-color-scheme="<?php echo get_field('color_scheme'); ?>">
          <div id="post-<?php the_ID() ?>" <?php post_class() ?>>
            <div class="post__images gutters">
              <?php
                $acf_repeater = 'images';
                $acf_image_field_name = 'image';
                $image_size = 'large';

                if(have_rows($acf_repeater)):
                  while (have_rows($acf_repeater)): the_row();
                    $image = get_sub_field($acf_image_field_name);
                    $alt = $image['alt'];
                    if(empty($alt)) $alt = $image['title'];
                    $size = $image_size;
                    $url = $image['sizes'][$size];
                    $width = $image['sizes'][$size.'-width'];
                    $height = $image['sizes'][$size.'-height'];

                    $column_size = get_sub_field('image_width');
                    $column_width = $column_size . '%';
                    $column_class = $column_size == 100 ? 'full-width-image' : 'partial-width-image';

                    echo '<div class="post__images__image-wrapper '.$column_class.'" style="width: '.$column_width.';">';
                      echo '<img src="'.$url.'" width="'.$width.'" height="'.$height.'" alt="'.$alt.'">';
                    echo '</div>';
                  endwhile;
                endif;
              ?>
          </div><!-- .post__images -->
          <div class="post__information-wrapper">
            <div class="post__information">
              <div class="post__information__content scroll-column scroll-column-1 col-sm-6">
                <div class="post__information__header">
                  <div class="post__information__title">
                    <?php the_title(); ?>
                  </div>
                  <div class="post__information__byline">
                    <?php the_field('byline'); ?>
                  </div>
                </div>
                <?php the_field('information'); ?>
              </div>
              <div class="post__information__credits scroll-column scroll-column-2 col-sm-6">
                <?php the_field('credits'); ?>
              </div>
            </div><!-- .post__information -->
          </div>
        </div><!-- .content -->
      </div><!-- .ajax-wrapper__post -->
    </div><!-- .ajax-wrapper -->
  </div><!-- .row -->

  <?php get_footer() ?>
  <script>
    Fanton.setSinglePost();
  </script>
</body>
</html>
