<nav class="home-page-nav one-half">

  <h1>
    <a class="site-title" href="<?php bloginfo('url') ?>/" title="<?php echo esc_html( bloginfo('name'), 1 ) ?>" rel="home">
      <span class="site-title__text">
        <?php bloginfo('name') ?>
      </span>
      <span class="site-title__hover-text">
        <?php the_field('fanton_rollover', 'option'); ?>
      </span>
    </a>
  </h1>

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

        $active_class = $single_post && $single_post == $post ? 'active' : '';

        echo '<div class="home__post-title-wrapper '.$active_class.'">';
          echo '<a class="home__post-title-link" href="'.get_permalink().'" data-post-id="'.$post->ID.'" data-title="'.get_the_title().'">';
            echo '<div class="home__post-title">';
              the_title();
            echo '</div>';
            echo '<span class="home__post-category">';
              echo 'Poster Test Cat';
            echo '</span>';
          echo '</a>';
          $image = get_field('featured_image');
          if(isset($image)) {
            $url = $image['sizes']['large'];
            echo '<div class="home__post-image" style="background-image: url('.$url.');" ></div>';
          }
        echo '</div>';

      endwhile;
    endif;
    wp_reset_postdata();
  ?>
</nav>

<?php $information_page_id = sandbox_get_id_by_slug('information'); ?>

<div class="information-link-wrapper">
  <a class="information-link" href="<?php echo get_permalink($information_page_id); ?>">Information</a>
  <div class="information-wrapper col">
    <?php
      $column_1 = get_field('information_column_1', $information_page_id);
      $column_2 = get_field('information_column_2', $information_page_id);
    ?>

    <div class="information-column--1 one-half">
      <?php echo $column_1; ?>
    </div>

    <div class="information-column--2 one-half">
      <p class="information__close-button-wrapper">
        <span class="information__close-button">Close</span>
        <br>
        <br>
      </p>
      <?php echo $column_2; ?>
    </div>
  </div>
</div>
