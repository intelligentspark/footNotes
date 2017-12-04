jQuery(document).ready(function() {
    var footnotes = [];
    jQuery("span.fnoteWrap").on('click',function(event) {
        var footnote_content = jQuery(this).children('span.fnoteDesc').html();
        var fid = jQuery(this).data('footnote-id');

        if(jQuery.inArray(fid,footnotes)==-1) {	//create new footnote content box
            footnotes.push(fid);
            jQuery('<div id="wk_ft'+fid+'_content" class="footnoteContent" style="display:none;"><button id="wk_ft'+fid+'_close_button"class="closeBtn">X</button><br>'+footnote_content+'</div>').appendTo(this);
            jQuery("#wk_ft"+fid+"_close_button").on('click',function(event) {
                event.stopPropagation();
                jQuery("#wk_ft"+fid+"_content").fadeOut();
            });

        }
        jQuery("#wk_ft"+fid+"_content").fadeIn();

    });
});