<?php
/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4; */

/**
 * Create a new neatline.
 *
 * PHP version 5
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at http://www.apache.org/licenses/LICENSE-2.0 Unless required by
 * applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific
 * language governing permissions and limitations under the License.
 *
 * @package     omeka
 * @subpackage  neatline
 * @author      Scholars' Lab <>
 * @author      Bethany Nowviskie <bethany@virginia.edu>
 * @author      Adam Soroka <ajs6f@virginia.edu>
 * @author      David McClure <david.mcclure@virginia.edu>
 * @copyright   2011 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html Apache 2 License
 */
?>

<?php
queue_js('slugBuilder');
queue_js('_constructAdd');
queue_js('tiny_mce/tiny_mce');
?>

<?php
$title = __('Neatline | Create an Exhibit');
head(array('content_class' => 'neatline', 'title' => $title));
?>

<h1><?php echo $title; ?></h1>

<div id="primary">
    <?php echo flash(); ?>
    <?php echo $form; ?>
</div>

<script>
jQuery(document).ready(function($){
    Omeka.wysiwyg();
});
</script>

<?php
foot();
?>
