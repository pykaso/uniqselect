/*
// jQuery uniqselect
//
// Version 0.1
//
// Lukas Gergel
// Pykaso.net (http://pykaso.net/)
//
// Usage: $('#group_of_selects').uniqselect();
//
// No options required
//
// Dependencies:  jQuery 1.7 or higher (http://jquery.com/)
//
// Licensing & Terms of Use
//
// jQuery uniqselect is licensed under a Creative Commons License
// http://creativecommons.org/licenses/by/3.0/us/
//
// (c)2012 by Lukas Gergel (admin@pykaso.net)
// 
*/
$.fn.uniqselect = function(container){
      var option = function(value){var v = ((value==0)?'':value); return '<option value="'+v+'">'+v+'</option>';}
     
      var updateSelectOptions = function(selectNodes, defOptionsCount){
         var vals=[], opts=[];
      
         selectNodes.filter(function(){return $(this).val()!=''}).each(function(){
            vals.push(parseInt($(this).val(),10));
         });
      
         for(var i=0; i<(defOptionsCount); i++){
            if($.inArray(i,vals)==-1){
               opts[i] = option(i);
            }
         }
      
         selectNodes.each(function(){
            var val = parseInt($(this).val(),10);
            var opt = opts.slice(0);
            var select = $(this);
            
            if(val!=0){
               opt[val] = option(val);
            }
            
            $('option',select).each(function(){$(this).remove()});
            
            $.each(opt,function(i){
               if(opt[i]){
                  select.append(opt[i]);
               }
            })
            $(this).val(val);
         });     
      };
     
      return this.each(function(){
         var selectNodes = $('select', this);
         var defOptionsCount = (selectNodes.length>0) ? 
            ('option',selectNodes[0]).length : 0;
         
         selectNodes.change(function() {
            updateSelectOptions(selectNodes,defOptionsCount);   
         });
         
         updateSelectOptions(selectNodes,defOptionsCount);
      });
   };