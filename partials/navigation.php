<div class="row">
  <div class="nav-outer-wrapper">
    <div class="nav-col <?php echo fanton_list_mode() ? 'col-sm-6' : '' ?>">
      <nav class="home-page-nav">

        <div class="row">
          <?php if ( fanton_grid_mode() ): ?>
            <a class="list-button control-button col-sm-offset-8" href="<?php bloginfo('url') ?>/?list" rel="home">List</a>
          <?php else: ?>
            <a class="grid-button control-button col-sm-offset-8" href="<?php bloginfo('url') ?>/?grid" rel="home">Grid</a>
          <?php endif; ?>
        </div>

        <?php
          if(is_single()) {
            $single_post = $post;
          } else {
            $single_post = false;
          }

          $args = array(
            'posts_per_page'   => -1,
            'post_type'        => 'post',
          );

          $the_query = new WP_Query( $args );

          if ( $the_query->have_posts() ):
            echo '<div class="navigation-list-wrapper">';
              while ( $the_query->have_posts() ):
                $the_query->the_post();

                if ( fanton_list_mode() ) {
                  include(locate_template('partials/navigation_list.php'));
                } else {
                  include(locate_template('partials/navigation_grid.php'));
                }

              endwhile;
            echo '</div>';
          endif;
          wp_reset_postdata();
        ?>
      </nav>
    </div>
  </div>
</div>

<?php $information_page_id = sandbox_get_id_by_slug('information'); ?>

<div class="row">
  <div class="information-link-wrapper col-sm-12 large-gutters">
    <div class="information-link-wrapper__row row">
      <div class="information-link-inner-wrapper col-sm-12 large-gutters" href="<?php echo get_permalink($information_page_id); ?>">
        <a class="information-link" href="<?php echo get_permalink($information_page_id); ?>">
          Information
        </a>
      </div>
    </div>
    <div class="information-wrapper large-gutters">
      <?php
        $column_1 = get_field('information_column_1', $information_page_id);
        $column_2 = get_field('information_column_2', $information_page_id);
      ?>

      <div class="row">
        <div class="information-column--1 scroll-column scroll-column-1 col-sm-6">
          <p>&nbsp;</p>
          <?php echo $column_1; ?>
        </div>

        <div class="information-column--2 scroll-column scroll-column-2 col-sm-6">
          <div class="information__close-button-wrapper">
            <span class="information__close-button control-button col-sm-offset-6">Close</span>
            <br>
            <br>
          </div>
          <?php echo $column_2; ?>
        </div>
      </div>
    </div>
  </div>
</div>
