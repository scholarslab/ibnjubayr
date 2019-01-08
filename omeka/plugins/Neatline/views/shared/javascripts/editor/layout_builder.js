/*
     http://www.apache.org/licenses/LICENSE-2.0.html Apache 2 License
*/
(function(c){c.widget("neatline.layoutbuilder",{options:{css:{gloss_fade_duration:300,vt1_percentage:15,vt2_percentage:85},colors:{map:{def:"#fff",target:"#fffcf4"},timeline:{def:"#fff",target:"#fffcf4"},items:{def:"#fff",target:"#fffcf4"}}},_create:function(){this._window=c(window);this.buttons=c("#options");this.dragbox=c("#drag-box");this._lastItemsParams=this._lastTimelineParams=this._lastMapParams=null;this._disableSelect();this._createDraggers();this._instantiatePositioner();this.getPxConstants();
this._createButtons();this._setStartingParameters();this._addDragEvents()},_instantiatePositioner:function(){var b=this;this.dragbox.positioner({markup:{map:"#drag-map",timeline:"#drag-timeline",items:"#drag-items"},constants:{h_percent:Neatline.proportions.horizontal,v_percent:Neatline.proportions.vertical},mapFullscreen:!1,drag:function(a,e){b._trigger("widthDrag",{},e);b.centerAllTags();b.getPxConstants();b._computePositions()},layoutChange:function(){b.centerAllTags();b.getPxConstants();b._computePositions()}})},
_setStartingParameters:function(){this._top_element=Neatline.record.top_element;this._items_h_pos=Neatline.record.items_h_pos;this._items_v_pos=Neatline.record.items_v_pos;this._items_height=Neatline.record.items_height;this._is_map=Boolean(Neatline.record.is_map);this._is_timeline=Boolean(Neatline.record.is_timeline);this._is_items=Boolean(Neatline.record.is_items);this._computePositions();this.map_toggle.togglebutton("enable");this.timeline_toggle.togglebutton("enable");this.items_toggle.togglebutton("enable");
this._is_map?(this._is_map=!1,this.map_toggle.togglebutton("press")):this._is_map=!1;this._is_timeline?(this._is_timeline=!1,this.timeline_toggle.togglebutton("press")):this._is_timeline=!1;this._is_items?(this._is_items=!1,this.items_toggle.togglebutton("press")):this._is_items=!1},getPxConstants:function(){this.dragbox.positioner("measure");this.width=this.dragbox.positioner("getAttr","width");this.height=this.dragbox.positioner("getAttr","height");this.minorWidth=this.dragbox.positioner("getAttr",
"minorWidth");this.majorWidth=this.dragbox.positioner("getAttr","majorWidth");this.majorHeight=this.dragbox.positioner("getAttr","majorHeight");this.minorHeight=this.dragbox.positioner("getAttr","minorHeight");this.dragboxOffset=this.dragbox.offset();this.vt1=this.height*(this.options.css.vt1_percentage/100);this.vt2=this.height*(this.options.css.vt2_percentage/100)},_computePositions:function(){this.positions=this.dragbox.positioner("compute",this._is_map,this._is_timeline,this._is_items,this._top_element,
this._items_v_pos,this._items_h_pos,this._items_height)},_disableSelect:function(){this.element.css("MozUserSelect","none");this.element.bind("selectstart mousedown",function(){return!1});this.dragbox.css("cursor","default")},_createButtons:function(){var b=this;this.map_toggle=c("#toggle-map");this.timeline_toggle=c("#toggle-timeline");this.items_toggle=c("#toggle-items");this.map_toggle.togglebutton({pressed_by_default:!1,enabled_by_default:!1,press:function(){b._toggleMap()},unpress:function(){b._toggleMap()}});
this.timeline_toggle.togglebutton({pressed_by_default:!1,enabled_by_default:!1,press:function(){b._toggleTimeline()},unpress:function(){b._toggleTimeline()}});this.items_toggle.togglebutton({pressed_by_default:!1,enabled_by_default:!1,press:function(){b._toggleItems()},unpress:function(){b._toggleItems()}})},_createDraggers:function(){this.map_drag=this.__createMapDiv();this.timeline_drag=this.__createTimelineDiv();this.items_drag=this.__createItemsDiv();this.dragbox.append(this.map_drag,this.timeline_drag,
this.items_drag)},_addDragEvents:function(){var b=this;this.map_drag.bind({mouseenter:function(){b._is_dragging||b.__mapHighlight("enter")},mouseleave:function(){b._is_dragging||b.__mapHighlight("leave")},mousedown:function(a){if(!b._is_dragging)b._current_dragger="map",b.__doMapDrag(a)}});this.timeline_drag.bind({mouseenter:function(){b._is_dragging||b.__timelineHighlight("enter")},mouseleave:function(){b._is_dragging||b.__timelineHighlight("leave")},mousedown:function(a){if(!b._is_dragging)b._current_dragger=
"timeline",b.__doTimelineDrag(a)}});this.items_drag.bind({mouseenter:function(){b._is_dragging||b.__itemsHighlight("enter")},mouseleave:function(){b._is_dragging||b.__itemsHighlight("leave")},mousedown:function(a){if(!b._is_dragging)b._current_dragger="items",b.__doItemsDrag(a)}})},applyProportions:function(b,a){this.dragbox.positioner("applyProportions",b,a);this.centerAllTags()},_reposition:function(){this.dragbox.positioner("apply");this.centerAllTags()},_position_tag:function(b){var a=b.find(".drag-tag"),
b=b.height(),e=a.height();a.css("top",b/2-e/2+"px")},centerAllTags:function(){this._position_tag(this.map_drag);this._position_tag(this.timeline_drag);this._position_tag(this.items_drag)},_toggleMap:function(){switch(this._is_map){case !0:this._is_map=!1;!this._is_timeline&&this._is_items&&this.items_toggle.togglebutton("press");break;case !1:this._is_map=!0}this._computePositions();this._reposition()},_toggleTimeline:function(){switch(this._is_timeline){case !0:this._is_timeline=!1;!this._is_map&&
this._is_items&&this.items_toggle.togglebutton("press");break;case !1:this._is_timeline=!0}this._computePositions();this._reposition()},_toggleItems:function(){switch(this._is_items){case !0:this._is_items=!1;break;case !1:this._is_items=!0}this._computePositions();this._reposition()},_animate_position_tag:function(b,a){var e=b.find(".drag-tag"),c=e.height();e.stop().animate({top:a/2-c/2+"px"})},__mapHighlight:function(b){switch(b){case "enter":var a=this.options.colors.map.target;break;case "leave":a=
this.options.colors.map.def}this.map_drag.clearQueue().animate({"background-color":a},this.options.css.gloss_fade_duration)},__timelineHighlight:function(b){switch(b){case "enter":var a=this.options.colors.timeline.target;break;case "leave":a=this.options.colors.timeline.def}this.timeline_drag.clearQueue().animate({"background-color":a},this.options.css.gloss_fade_duration)},__itemsHighlight:function(b){switch(b){case "enter":var a=this.options.colors.items.target;break;case "leave":a=this.options.colors.items.def}this.items_drag.clearQueue().animate({"background-color":a},
this.options.css.gloss_fade_duration)},__doMapDrag:function(b){var a=this;this._is_dragging=!0;var c=b.pageX,d=b.pageY,f=this.positions.map.left,g=this.positions.map.top;this.__fadeDragger(this.map_drag);this._window.bind({mousemove:function(b){a.map_drag.css({left:f+(b.pageX-c),top:g+(b.pageY-d)});if(a._is_timeline&&a._is_items){if(a._top_element==="map"){if(b.pageY>a.dragboxOffset.top+a.majorHeight)a._top_element="timeline",a.__slideTimeline(!1),a.__slideItems(!1)}else if(a._top_element==="timeline"&&
b.pageY<a.dragboxOffset.top+a.majorHeight)a._top_element="map",a.__slideTimeline(!1),a.__slideItems(!1);if(a.__mapIsLevelWithItems())if(a._items_h_pos==="right"){if(b.pageX>a.dragboxOffset.left+a.majorWidth)a._items_h_pos="left",a.__slideItems(!1)}else if(a._items_h_pos==="left"&&b.pageX<a.dragboxOffset.left+a.minorWidth)a._items_h_pos="right",a.__slideItems(!1)}else if(a._is_timeline&&!a._is_items)if(a._top_element==="map"){if(b.pageY>a.dragboxOffset.top+a.majorHeight)a._top_element="timeline",a.__slideTimeline(!1)}else{if(a._top_element===
"timeline"&&b.pageY<a.dragboxOffset.top+a.majorHeight)a._top_element="map",a.__slideTimeline(!1)}else if(!a._is_timeline&&a._is_items&&a.__mapIsLevelWithItems())if(a._items_h_pos==="right"){if(b.pageX>a.dragboxOffset.left+a.majorWidth)a._items_h_pos="left",a.__slideItems(!1)}else if(a._items_h_pos==="left"&&b.pageX<a.dragboxOffset.left+a.minorWidth)a._items_h_pos="right",a.__slideItems(!1)},mouseup:function(){a.__slideMap(!0);a._window.unbind("mousemove mouseup")}})},__doTimelineDrag:function(b){var a=
this;this._is_dragging=!0;var c=b.pageX,d=b.pageY,f=this.positions.timeline.left,g=this.positions.timeline.top;this.__fadeDragger(this.timeline_drag);this._window.bind({mousemove:function(b){a.timeline_drag.css({left:f+(b.pageX-c),top:g+(b.pageY-d)});if(a._is_map&&a._is_items){if(a._top_element==="timeline"){if(b.pageY>a.dragboxOffset.top+a.majorHeight)a._top_element="map",a.__slideMap(!1),a.__slideItems(!1)}else if(a._top_element==="map"&&b.pageY<a.dragboxOffset.top+a.majorHeight)a._top_element=
"timeline",a.__slideMap(!1),a.__slideItems(!1);if(a.__timelineIsLevelWithItems())if(a._items_h_pos==="right"){if(b.pageX>a.dragboxOffset.left+a.majorWidth)a._items_h_pos="left",a.__slideItems(!1)}else if(a._items_h_pos==="left"&&b.pageX<a.dragboxOffset.left+a.minorWidth)a._items_h_pos="right",a.__slideItems(!1)}else if(a._is_map&&!a._is_items)if(a._top_element==="timeline"){if(b.pageY>a.dragboxOffset.top+a.majorHeight)a._top_element="map",a.__slideMap(!1)}else{if(a._top_element==="map"&&b.pageY<a.dragboxOffset.top+
a.majorHeight)a._top_element="timeline",a.__slideMap(!1)}else if(!a._is_map&&a._is_items&&a.__timelineIsLevelWithItems())if(a._items_h_pos==="right"){if(b.pageX>a.dragboxOffset.left+a.majorWidth)a._items_h_pos="left",a.__slideItems(!1)}else if(a._items_h_pos==="left"&&b.pageX<a.dragboxOffset.left+a.minorWidth)a._items_h_pos="right",a.__slideItems(!1)},mouseup:function(){a.__slideTimeline(!0);a._window.unbind("mousemove mouseup")}})},__doItemsDrag:function(b){var a=this;this._is_dragging=!0;var c=
b.pageX,d=b.pageY,f=this.positions.items.left,g=this.positions.items.top;this.__fadeDragger(this.items_drag);this._window.bind({mousemove:function(b){a.items_drag.css({left:f+(b.pageX-c),top:g+(b.pageY-d)});if(a._is_map&&a._is_timeline){if(b.pageY<a.dragboxOffset.top+a.vt1)a._items_height="partial",a._items_v_pos="top",a.__slideMap(!1),a.__slideTimeline(!1);if(b.pageY>a.dragboxOffset.top+a.vt1&&b.pageY<a.dragboxOffset.top+a.vt2)a._items_height="full",a.__slideMap(!1),a.__slideTimeline(!1);if(b.pageY>
a.dragboxOffset.top+a.vt2)a._items_height="partial",a._items_v_pos="bottom",a.__slideMap(!1),a.__slideTimeline(!1);if(a.__mapIsLevelWithItems()){if(a._items_h_pos==="right"&&b.pageX<a.dragboxOffset.left+a.width/2)a._items_h_pos="left",a.__slideMap(!1);if(a._items_h_pos==="left"&&b.pageX>a.dragboxOffset.left+a.width/2)a._items_h_pos="right",a.__slideMap(!1)}if(a.__timelineIsLevelWithItems()){if(a._items_h_pos==="right"&&b.pageX<a.dragboxOffset.left+a.width/2)a._items_h_pos="left",a.__slideTimeline(!1);
if(a._items_h_pos==="left"&&b.pageX>a.dragboxOffset.left+a.width/2)a._items_h_pos="right",a.__slideTimeline(!1)}if(a._items_height==="full"){if(a._items_h_pos==="right"&&b.pageX<a.dragboxOffset.left+a.width/2)a._items_h_pos="left",a.__slideMap(!1),a.__slideTimeline(!1);if(a._items_h_pos==="left"&&b.pageX>a.dragboxOffset.left+a.width/2)a._items_h_pos="right",a.__slideMap(!1),a.__slideTimeline(!1)}}else if(a._is_map&&!a._is_timeline){if(a._items_h_pos==="right"&&b.pageX<a.dragboxOffset.left+a.width/
2)a._items_h_pos="left",a.__slideMap(!1);if(a._items_h_pos==="left"&&b.pageX>a.dragboxOffset.left+a.width/2)a._items_h_pos="right",a.__slideMap(!1)}else if(!a._is_map&&a._is_timeline){if(a._items_h_pos==="right"&&b.pageX<a.dragboxOffset.left+a.width/2)a._items_h_pos="left",a.__slideTimeline(!1);if(a._items_h_pos==="left"&&b.pageX>a.dragboxOffset.left+a.width/2)a._items_h_pos="right",a.__slideTimeline(!1)}},mouseup:function(){a.__slideItems(!0);a._window.unbind("mousemove mouseup")}})},__slideTimeline:function(b){var a=
this;if(!c.compare([this._top_element,this._items_h_pos,this._items_v_pos,this._items_height],this.lastTimelineParams)||this._current_dragger==="timeline")this._computePositions(),b?this.timeline_drag.stop().animate({height:this.positions.timeline.height,width:this.positions.timeline.width,top:this.positions.timeline.top,left:this.positions.timeline.left,opacity:1,"z-index":0},function(){a._is_dragging=!1;a.timeline_drag.trigger("mouseleave")}):this.timeline_drag.stop().animate({height:this.positions.timeline.height,
width:this.positions.timeline.width,top:this.positions.timeline.top,left:this.positions.timeline.left}),this._animate_position_tag(this.timeline_drag,this.positions.timeline.height),this.lastTimelineParams=[this._top_element,this._items_h_pos,this._items_v_pos,this._items_height]},__slideMap:function(b){var a=this;if(!c.compare([this._top_element,this._items_h_pos,this._items_v_pos,this._items_height],this.lastMapParams)||this._current_dragger==="map")this._computePositions(),b?this.map_drag.stop().animate({height:this.positions.map.height,
width:this.positions.map.width,top:this.positions.map.top,left:this.positions.map.left,opacity:1,"z-index":0},function(){a._is_dragging=!1;a.map_drag.trigger("mouseleave")}):this.map_drag.stop().animate({height:this.positions.map.height,width:this.positions.map.width,top:this.positions.map.top,left:this.positions.map.left}),this._animate_position_tag(this.map_drag,this.positions.map.height),this.lastMapParams=[this._top_element,this._items_h_pos,this._items_v_pos,this._items_height]},__slideItems:function(b){var a=
this;if(!c.compare([this._top_element,this._items_h_pos,this._items_v_pos,this._items_height],this.lastItemParams)||this._current_dragger==="items")this._computePositions(),b?this.items_drag.stop().animate({height:this.positions.items.height,width:this.positions.items.width,top:this.positions.items.top,left:this.positions.items.left,opacity:1,"z-index":0},function(){a._is_dragging=!1;a.items_drag.trigger("mouseleave")}):this.items_drag.stop().animate({height:this.positions.items.height,width:this.positions.items.width,
top:this.positions.items.top,left:this.positions.items.left}),this._animate_position_tag(this.items_drag,this.positions.items.height),this.lastItemParams=[this._top_element,this._items_h_pos,this._items_v_pos,this._items_height]},__createMapDiv:function(){return c('<div id="drag-map" class="draggable">                        <span class="drag-tag">Map</span>                      </div>')},__createTimelineDiv:function(){return c('<div id="drag-timeline" class="draggable">                        <span class="drag-tag">Timeline</span>                      </div>')},
__createItemsDiv:function(){return c('<div id="drag-items" class="draggable">                        <span class="drag-tag">Items</span>                      </div>')},__fadeDragger:function(b){b.css({opacity:0.5,"z-index":99})},__mapIsLevelWithItems:function(){if(this._is_map&&this._is_timeline&&this._is_items){if(this._top_element==="map"&&this._items_height==="partial"&&this._items_v_pos==="top")return!0;if(this._top_element==="timeline"&&this._items_height==="partial"&&this._items_v_pos==="bottom")return!0}else if(this._is_map&&
!this._is_timeline&&this._is_items)return!0;return!1},__timelineIsLevelWithItems:function(){if(this._is_map&&this._is_timeline&&this._is_items){if(this._top_element==="timeline"&&this._items_height==="partial"&&this._items_v_pos==="top")return!0;if(this._top_element==="map"&&this._items_height==="partial"&&this._items_v_pos==="bottom")return!0}else if(!this._is_map&&this._is_timeline&&this._is_items)return!0;return!1},getArrangementParameters:function(){var b=this._is_map?1:0,a=this._is_timeline?
1:0,c=this._is_items?1:0,d=this.dragbox.positioner("getAttr","options");return{exhibit_id:Neatline.record.id,is_map:b,is_timeline:a,is_items:c,top_element:this._top_element,items_h_pos:this._items_h_pos,items_v_pos:this._items_v_pos,items_height:this._items_height,h_percent:d.constants.h_percent,v_percent:d.constants.v_percent}},getAttr:function(b){return this[b]}});c.extend({compare:function(b,a){if(_.isUndefined(b)||_.isUndefined(a))return!1;if(b.length!==a.length)return!1;var e=c.extend(!0,[],
b),d=c.extend(!0,[],a);e.sort();d.sort();for(var f=0,g=e.length;f<g;f++)if(e[f]!==d[f])return!1;return!0}})})(jQuery);