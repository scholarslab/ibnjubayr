<?php
/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4; */

/**
 * Table class for exhibits.
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

class NeatlineExhibitTable extends Omeka_Db_Table
{

    /**
     * Fetch Neatlines for the main browse view.
     *
     * @param string $sortField The column to sort by.
     * @param string $sortDir 'a' or 'd' for ASC and DESC.
     * @param integer $page The page number.
     *
     * @return array of Omeka_record $neatlines The Neatlines.
     */
    public function getNeatlinesForBrowse(
        $sortField = 'added',
        $sortDir = 'd',
        $page = 1)
    {

        $orderClause = neatline_buildOrderClause($sortField, $sortDir);
        $select = $this->getSelect();

        if (isset($page)) {
            $select->limitPage($page, get_option('per_page_admin'));
        }

        if (isset($orderClause)) {
            $select->order($orderClause);
        }

        return $this->fetchObjects($select);

    }

    /**
     * Find exhibit by slug.
     *
     * @param string $slug The slug.
     *
     * @return Omeka_record $exhibit The exhibit.
     */
    public function findBySlug($slug)
    {

        // Form the select.
        $select = $this->getSelect()->where('slug=?', $slug);

        return $this->fetchObject($select);

    }

    /**
     * Build array with current_page, per_page, and total_results.
     *
     * @param integer $page The page number.
     *
     * @return array $pagination The settings.
     */
    public function getPaginationSettings($page)
    {

        return array(
            'current_page' => $page,
            'per_page' => get_option('per_page_admin'),
            'total_results' => $this->count()
        );

    }

    /**
     * Check that the current user has permission to see non-public items.
     *
     * @return Omeka_Db_Select
     */
    public function getSelect()
    {

        $select = parent::getSelect();
        $acl = Omeka_Context::getInstance()->acl;

        if ($acl && $acl->has('Neatline_Index')) {
            $has_permission = $acl->isAllowed(current_user(), 'Neatline_Index', 'showNotPublic');
            if (!$has_permission) {
                $select->where('public = 1');
            }
        }

        return $select;

    }

}
