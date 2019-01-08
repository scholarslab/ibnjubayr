<?php
/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4; */

/**
 * Markup for the geometry editor application.
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

<div id="geo-edit">
    <button class="btn geo-edit" id="drag-button"><?php echo __('Drag'); ?></button>
    <button class="btn geo-edit" id="rotate-button"><?php echo __('Rotate'); ?></button>
    <button class="btn geo-edit" id="scale-button"><?php echo __('Scale'); ?></button>
    <button class="btn geo-edit btn-danger" id="delete-button"><?php echo __('Delete'); ?></button>
</div>

<div id="regular-shapes">
    <select id="regular-shapes-select" name="regular-shapes">
        <option value="rectangle"><?php echo __('rectangle'); ?></option>
        <option value="elipse"><?php echo __('elipse'); ?></option>
    </select>
</div>
