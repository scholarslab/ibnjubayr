<!DOCTYPE html>
<!-- paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->
<!-- Consider specifying the language of your content by adding the `lang` attribute to <html> -->
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>

    <meta charset="utf-8">

    <title><?php echo settings('site_title'); echo isset($title) ? ' | ' . strip_formatting($title) : ''; ?></title>

    <meta name="description" content="">

    <!-- Mobile viewport optimized: h5bp.com/viewport -->
    <meta name="viewport" content="width=device-width">

    <?php echo auto_discovery_link_tags(); ?>

    <?php plugin_header(); ?>

    <?php queue_theme_assets(); ?>
    <?php display_js(); ?>
    <?php display_css(); ?>

</head>

<?php echo body_tag(array('id' => @$bodyid, 'class' => @$bodyclass)); ?>

<?php plugin_body(); ?>

  <header role="banner">

    <?php plugin_page_header(); ?>

    <h1 id="site-title"><?php echo link_to_home_page(custom_display_logo()); ?></h1>

    <div id="primary-nav">
      <nav>
        <ul class="navigation">
            <?php echo public_nav_main(array(__('Browse Exhibits') => uri('neatline-exhibits'))); ?>
        </ul>
      </nav>
    </div>

  </header>

  <div role="main">
<?php if ($bodyid == 'home'): ?>
<figure id="hajj">
<img src="<?php echo img('hajj2.jpg'); ?>">
</figure>
<?php endif; ?>

    <?php plugin_page_content(); ?>

