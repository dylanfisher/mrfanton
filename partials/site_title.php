<h1 class="site-title <?php echo fanton_list_mode() ? 'col-sm-6' : '' ?>">
  <a href="<?php bloginfo('url') ?>/" rel="home">
    <span class="site-title__text">
      <?php bloginfo('name') ?>
    </span>
    <span class="site-title__hover-text">
      <?php the_field('fanton_rollover', 'option'); ?>
    </span>
  </a>
</h1>
