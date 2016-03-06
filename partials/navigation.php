<div class="row">
  <div class="nav-col <?php echo !isset($_GET['grid']) ? 'col-sm-6' : '' ?>">
    <nav class="home-page-nav">

      <h1 class="site-title <?php echo isset($_GET['grid']) ? 'col-sm-6' : '' ?>">
        <a href="<?php bloginfo('url') ?>/" rel="home">
          <span class="site-title__text">
            <?php bloginfo('name') ?>
          </span>
          <span class="site-title__hover-text">
            <?php the_field('fanton_rollover', 'option'); ?>
          </span>
        </a>
      </h1>

      <div class="row">
        <?php if ( isset($_GET['grid']) ): ?>
          <a class="list-button control-button col-sm-offset-10" href="<?php bloginfo('url') ?>/" rel="home">List</a>
        <?php else: ?>
          <a class="grid-button control-button col-sm-offset-10" href="<?php bloginfo('url') ?>/?grid" rel="home">Grid</a>
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
          while ( $the_query->have_posts() ):
            $the_query->the_post();

            if ( isset($_GET['grid']) ) {
              include(locate_template('partials/navigation_grid.php'));
            } else {
              include(locate_template('partials/navigation_list.php'));
            }

          endwhile;
        endif;
        wp_reset_postdata();
      ?>
    </nav>
  </div>
</div>

<?php $information_page_id = sandbox_get_id_by_slug('information'); ?>

<div class="row">
  <div class="information-link-wrapper col-sm-12 large-gutters">
    <div class="row">
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
          <p class="information__close-button-wrapper">
            <span class="information__close-button control-button col-sm-offset-6">Close</span>
            <br>
            <br>
          </p>
          <?php echo $column_2; ?>
        </div>
      </div>
    </div>
  </div>
</div>
