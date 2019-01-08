<?php
$title = item('Dublin Core', 'Title');
head(array('title' => $title, 'bodyid'=>'items','bodyclass' => 'show')); ?>

<div id="primary">

    <h1><?php echo $title; ?></h1>


    <div class="item-metadata">
        <?php echo show_item_metadata(); ?>
    </div>
    <ul class="item-pagination navigation">
        <li id="previous-item" class="previous"><?php echo link_to_previous_item(); ?></li>
        <li id="next-item" class="next"><?php echo link_to_next_item(); ?></li>
    </ul>

</div><!-- end primary -->

<div id="secondary">
    <?php echo display_files_for_item(array('imageSize' => 'fullsize')); ?>

        <?php if (item_belongs_to_collection()): ?>
        <div id="collection" class="element">
            <h3><?php echo __('Collection'); ?></h3>
            <div class="element-text">
              <p><?php echo link_to_collection_for_item(); ?></p>
            </div>
        </div>
        <?php endif; ?>

        <?php if (item_has_tags()): ?>
        <div id="item-tags" class="element">
            <h3><?php echo __('Tags'); ?></h3>
            <div class="element-text"><?php echo item_tags_as_string(); ?></div>
        </div>
        <?php endif;?>

        <div id="item-citation" class="element">
            <h3><?php echo __('Citation'); ?></h3>
            <div class="element-text"><?php echo item_citation(); ?></div>
        </div>

        <?php echo plugin_append_to_items_show(); ?>

</div>

<?php foot(); ?>
