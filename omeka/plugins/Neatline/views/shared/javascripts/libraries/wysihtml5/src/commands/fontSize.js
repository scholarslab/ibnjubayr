(function(a){var e=/wysiwyg-font-size-[a-z\-]+/g;a.commands.fontSize={exec:function(b,c,d){return a.commands.formatInline.exec(b,c,"span","wysiwyg-font-size-"+d,e)},state:function(b,c,d){return a.commands.formatInline.state(b,c,"span","wysiwyg-font-size-"+d,e)},value:function(){}}})(wysihtml5);