wysihtml5.browser.supported()&&(module("wysihtml5.Editor",{setup:function(){wysihtml5.dom.insertCSS(["#wysihtml5-test-textarea { width: 200px; height: 100px; margin-top: 5px; font-style: italic; border: 2px solid red; border-radius: 2px; }","#wysihtml5-test-textarea:focus { margin-top: 10px; }"]).into(document);this.textareaElement=document.createElement("textarea");this.textareaElement.id="wysihtml5-test-textarea";this.textareaElement.title="Please enter your foo";this.textareaElement.value="hey tiff, what's up?";
this.form=document.createElement("form");this.form.onsubmit=function(){return!1};this.form.appendChild(this.textareaElement);this.originalBodyClassName=document.body.className;document.body.appendChild(this.form)},teardown:function(){for(var b;b=document.querySelector("iframe.wysihtml5-sandbox, input[name='_wysihtml5_mode']");)b.parentNode.removeChild(b);this.form.parentNode.removeChild(this.form);document.body.className=this.originalBodyClassName},getComposerElement:function(){return this.getIframeElement().contentWindow.document.body},
getIframeElement:function(){var b=document.querySelectorAll("iframe.wysihtml5-sandbox");return b[b.length-1]}}),asyncTest("Basic test",function(){expect(16);var b=this,a=new wysihtml5.Editor(this.textareaElement);a.observe("load",function(){var c=b.getIframeElement(),d=b.getComposerElement(),e=b.textareaElement;ok(!0,"Load callback triggered");ok(wysihtml5.dom.hasClass(document.body,"wysihtml5-supported"),"<body> received correct class name");equal(e.style.display,"none","Textarea not visible");ok(c.style.display,
"","Editor iFrame is visible");equal(a.currentView.name,"composer","Current view is 'composer'");e.style.display="";deepEqual([c.offsetHeight,c.offsetWidth],[e.offsetHeight,e.offsetWidth],"Editor has the same dimensions as the original textarea");e.style.display="none";var f=e.nextSibling;equal(f.name,"_wysihtml5_mode","Hidden field has correct name");equal(f.value,"1","Hidden field has correct value");equal(f.type,"hidden","Hidden field is actually hidden");equal(e.nextSibling.nextSibling,c,"Editor iframe is inserted after the textarea");
equal(d.getAttribute("contentEditable"),"true","Body element in iframe is editable");equal(a.textarea.element,e,"Textarea correctly available on editor instance");equal(a.composer.element,d,"contentEditable element available on editor instance");equal(wysihtml5.dom.getStyle("font-style").from(d),"italic","Correct font-style applied to editor element");"borderRadius"in document.createElement("div").style&&(expect(17),ok(wysihtml5.dom.getStyle("border-top-right-radius").from(c).indexOf("2px")!==-1,
"border-radius correctly copied"));equal(d.innerHTML.toLowerCase(),"hey tiff, what's up?","Copied the initial textarea value to the editor");ok(wysihtml5.dom.hasClass(d,"wysihtml5-editor"),"Editor element has correct class name");start()})}),asyncTest("Check setting of name as class name on iframe and iframe's body",function(){expect(4);this.textareaElement.className="death-star";var b=this;(new wysihtml5.Editor(this.textareaElement,{name:"star-wars-input"})).observe("load",function(){var a=b.getIframeElement(),
c=b.getComposerElement(),d=b.textareaElement;ok(wysihtml5.dom.hasClass(a,"star-wars-input"),"iFrame has adopted name as className");ok(wysihtml5.dom.hasClass(c,"star-wars-input"),"iFrame's body has adopted name as className");ok(wysihtml5.dom.hasClass(c,"death-star"),"iFrame's body has adopted the textarea className");ok(!wysihtml5.dom.hasClass(d,"star-wars-input"),"Textarea has not adopted name as className");start()})}),asyncTest("Check textarea with box-sizing: border-box;",function(){expect(1);
var b=this;wysihtml5.dom.setStyles({MozBoxSizing:"border-box",WebkitBoxSizing:"border-box",MsBoxSizing:"border-box",boxSizing:"border-box"}).on(this.textareaElement);(new wysihtml5.Editor(this.textareaElement)).observe("load",function(){b.textareaElement.style.display="";deepEqual([b.getIframeElement().offsetWidth,b.getIframeElement().offsetHeight],[b.textareaElement.offsetWidth,b.textareaElement.offsetHeight],"Editor has the same dimensions as the original textarea");b.textareaElement.style.display=
"none";start()})}),asyncTest("Check whether attributes are copied",function(){expect(1);var b=this;(new wysihtml5.Editor(this.textareaElement)).observe("load",function(){equal(b.getComposerElement().title,b.textareaElement.title,"Editor got attributes copied over from textarea");start()})}),asyncTest("Check events",function(){expect(8);var b=this,a=new wysihtml5.Editor(this.textareaElement);a.observe("beforeload",function(){ok(!0,"'beforeload' event correctly fired")});a.observe("load",function(){var c=
b.getComposerElement(),d=b.getIframeElement();a.observe("focus",function(){ok(!0,"'focus' event correctly fired")});a.observe("blur",function(){ok(!0,"'blur' event correctly fired")});a.observe("change",function(){ok(!0,"'change' event correctly fired")});a.observe("paste",function(){ok(!0,"'paste' event correctly fired")});a.observe("drop",function(){ok(!0,"'drop' event correctly fired")});a.observe("custom_event",function(){ok(!0,"'custom_event' correctly fired")});QUnit.triggerEvent(c,"focus");
a.stopObserving("focus");c.innerHTML="foobar";QUnit.triggerEvent(c,"blur");QUnit.triggerEvent(c,"focusout");equal(wysihtml5.dom.getStyle("margin-top").from(d),"5px",":focus styles are correctly unset");QUnit.triggerEvent(c,"paste");QUnit.triggerEvent(c,"drop");a.fire("custom_event");setTimeout(function(){start()},100)})}),asyncTest("Check sync (basic)",function(){expect(1);var b=this;(new wysihtml5.Editor(this.textareaElement)).observe("load",function(){b.getComposerElement().innerHTML="<p>hello foobar, what up?</p>";
setTimeout(function(){equal(b.textareaElement.value.toLowerCase(),"<p>hello foobar, what up?</p>","Editor content got correctly copied over to original textarea");start()},500)})}),asyncTest("Check sync (advanced)",function(){expect(5);var b=this,a=new wysihtml5.Editor(this.textareaElement,{parserRules:{tags:{strong:!0}}});a.observe("load",function(){var c=b.getComposerElement();c.innerHTML="<strong>timmay!</strong>";setTimeout(function(){equal(b.textareaElement.value.toLowerCase(),"<strong>timmay!</strong>",
"Editor content got correctly copied over to original textarea");c.innerHTML='<font color="red">hey </font><strong>helen!</strong>';a.fire("change_view","textarea");equal(b.textareaElement.value.toLowerCase(),"hey <strong>helen!</strong>","Editor got immediately copied over to textarea after switching the view");b.textareaElement.value="<i>hey </i><strong>richard!</strong>";a.fire("change_view","composer");equal(c.innerHTML.toLowerCase(),"hey <strong>richard!</strong>","Textarea sanitized and copied over it's value to the editor after switch");
c.innerHTML="<i>hey </i><strong>timmay!</strong>";QUnit.triggerEvent(b.form,"submit");equal(b.textareaElement.value.toLowerCase(),"hey <strong>timmay!</strong>","Textarea gets the sanitized content of the editor onsubmit");setTimeout(function(){b.form.reset();setTimeout(function(){equal(wysihtml5.dom.getTextContent(c),"","Editor is empty after reset");start()},100)},500)},500)})}),asyncTest("Check placeholder",function(){expect(13);var b=this;this.textareaElement.value="";this.textareaElement.setAttribute("placeholder",
"enter text ...");var a=new wysihtml5.Editor(this.textareaElement);a.observe("load",function(){var c=b.getComposerElement();equal(wysihtml5.dom.getTextContent(c),"enter text ...","Placeholder text correctly copied into textarea");ok(wysihtml5.dom.hasClass(c,"placeholder"),"Editor got 'placeholder' css class");ok(a.hasPlaceholderSet(),"'hasPlaceholderSet' returns correct value when placeholder is actually set");a.fire("focus:composer");equal(wysihtml5.dom.getTextContent(c),"","Editor is empty after focus");
ok(!wysihtml5.dom.hasClass(c,"placeholder"),"Editor hasn't got 'placeholder' css class");ok(!a.hasPlaceholderSet(),"'hasPlaceholderSet' returns correct value when placeholder isn't actually set");a.fire("blur:composer");equal(wysihtml5.dom.getTextContent(c),"enter text ...","Editor restored placeholder text after unfocus");a.fire("focus:composer");equal(wysihtml5.dom.getTextContent(c),"");c.innerHTML="some content";a.fire("blur:composer");equal(wysihtml5.dom.getTextContent(c),"some content");ok(!wysihtml5.dom.hasClass(c,
"placeholder"),"Editor hasn't got 'placeholder' css class");a.fire("focus:composer");c.innerHTML="<img>";a.fire("blur:composer");equal(c.innerHTML.toLowerCase(),"<img>","HTML hasn't been cleared even though the innerText and textContent properties indicate empty content.");ok(!wysihtml5.dom.hasClass(c,"placeholder"),"Editor hasn't got 'placeholder' css class");setTimeout(function(){b.form.reset();setTimeout(function(){equal(wysihtml5.dom.getTextContent(c),"enter text ...","After form reset the editor has the placeholder as content");
start()},100)},500)})}),asyncTest("Check public api",function(){expect(14);var b=this,a=new wysihtml5.Editor(this.textareaElement,{parserRules:{tags:{p:{rename_tag:"div"}}},bodyClassName:"editor-is-supported",composerClassName:"editor"});a.observe("load",function(){ok(a.isCompatible(),"isCompatible() returns correct value");ok(wysihtml5.dom.hasClass(document.body,"editor-is-supported"),"<body> received correct class name");var c=b.getComposerElement();a.clear();equal(wysihtml5.dom.getTextContent(c),
"","Editor empty after calling 'clear'");ok(wysihtml5.dom.hasClass(c,"editor"),"Composer element has correct class name");a.setValue("hello <strong>foo</strong>!");equal(c.innerHTML.toLowerCase(),"hello <strong>foo</strong>!","Editor content correctly set after calling 'setValue'");ok(!a.isEmpty(),"'isEmpty' returns correct value when the composer element isn't actually empty");var d=a.getValue();equal(d.toLowerCase(),"hello <strong>foo</strong>!","Editor content correctly returned after calling 'getValue'");
a.clear();d=a.getValue();equal(d,"");ok(a.isEmpty(),"'isEmpty' returns correct value when the composer element is actually empty");equal(a.parse("<p>foo</p>").toLowerCase(),"<div>foo</div>","'parse' returns correct value");a.disable();ok(!c.getAttribute("contentEditable"),"When disabled the composer hasn't the contentEditable attribute");equal(c.getAttribute("disabled"),"disabled",'When disabled the composer has the disabled="disabled" attribute');a.enable();equal(c.getAttribute("contentEditable"),
"true","After enabling the editor the contentEditable property is true");ok(!c.getAttribute("disabled"),"After enabling the disabled attribute is unset");start()})}),asyncTest("Parser (default parser method with parserRules as object",function(){expect(2);var b={tags:{div:!0,p:{rename_tag:"div"},span:!0,script:void 0}},a=new wysihtml5.Editor(this.textareaElement,{parserRules:b});a.observe("load",function(){equal(a.config.parserRules,b,"Parser rules correctly set on config object");a.setValue("<p>foobar</p>",
!0);equal(a.getValue().toLowerCase(),"<div>foobar</div>","HTML got correctly parsed within setValue()");start()})}),asyncTest("Parser (custom parser method with parserRules as object",function(){expect(7);var b=this,a={script:void 0},c=this.textareaElement.value,d=c,e=new wysihtml5.Editor(this.textareaElement,{parserRules:a,parser:function(d,e,g){equal(d.toLowerCase(),c,"HTML passed into parser is equal to the one which just got inserted");equal(e,a,"Rules passed into parser are equal to those given to the editor");
equal(g,b.getIframeElement().contentWindow.document,"Context passed into parser is equal the document object of the editor's iframe");return d.replace(/\<script\>.*?\<\/script\>/gi,"")}});e.observe("load",function(){c="<p>foobar</p><script>alert(1);<\/script>";d="<p>foobar</p>";e.setValue(c,!0);equal(e.getValue().toLowerCase(),d,"HTML got correctly parsed within setValue()");start()})}),asyncTest("Inserting an element which causes the textContent/innerText of the contentEditable element to be empty works correctly",
function(){expect(2);var b=this;(new wysihtml5.Editor(this.textareaElement)).observe("load",function(){var a=b.getComposerElement(),c=b.textareaElement;a.innerHTML="<img>";QUnit.triggerEvent(a,"keypress");QUnit.triggerEvent(a,"keyup");QUnit.triggerEvent(a,"cut");QUnit.triggerEvent(a,"blur");setTimeout(function(){equal(a.innerHTML.toLowerCase(),"<img>","Composer still has correct content");equal(c.value.toLowerCase(),"<img>","Textarea got correct value");start()},500)})}),asyncTest("Check for stylesheets",
function(){expect(5);var b=this,a=["http://yui.yahooapis.com/2.8.2r1/build/reset/reset-min.css","http://yui.yahooapis.com/2.8.0/build/reset/reset-min.css"];(new wysihtml5.Editor(this.textareaElement,{stylesheets:a})).observe("load",function(){var c=b.getIframeElement().contentWindow.document.getElementsByTagName("link");equal(c.length,2,"Correct amount of stylesheets inserted into the dom tree");equal(c[0].getAttribute("href"),a[0]);equal(c[0].getAttribute("rel"),"stylesheet");equal(c[1].getAttribute("href"),
a[1]);equal(c[1].getAttribute("rel"),"stylesheet");start()})}),asyncTest("Check config.supportTouchDevices = false",function(){expect(2);var b=this,a=wysihtml5.browser.isTouchDevice;wysihtml5.browser.isTouchDevice=function(){return!0};(new wysihtml5.Editor(this.textareaElement,{supportTouchDevices:!1})).observe("load",function(){ok(!b.getIframeElement(),"No editor iframe has been inserted");equal(b.textareaElement.style.display,"","Textarea is visible");wysihtml5.browser.isTouchDevice=a;start()})}));