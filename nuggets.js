$(document).ready(function(){
    
    chrome.tabs.getSelected(null, function(tab) {
        getTabURL(tab.url);
        });

    function getTabURL(tablink) {
      $(".prepopulate").val(tablink);
      return tablink;
      }
    
    
    $('#submit').click(function() {
        var formData = $("#form").serializeArray(),
            len = formData.length,
            dataObj = {};
        
        for (i=0; i<len; i++) {
            dataObj[formData[i].name] = formData[i].value;
            }
        
        Parse.initialize("sKtmhxM9qK4VPgdJ8s1speUjACWy49U18mB6BlJY", "rTgoaqx3zjpZ4TPwuWlUa7niqvVxR6QMWtdENsET");

        var Nugget = Parse.Object.extend("Nugget");
        var nuggetObject = new Nugget();
          nuggetObject.save({Content: dataObj['Nugget.Content'], Source: dataObj['Nugget.Source'], Tag: dataObj['Nugget.Tag']}, {
          success: function(object) {
            $(".success").show();
          },
          error: function(model, error) {
            $(".error").show();
          }
        });

        var results = [];
        results.push('<h3>Content:' + dataObj['Nugget.Content'] + '</h3>');
        results.push('<div>Source:' + dataObj['Nugget.Source']  + '</div>');
        results.push('<div>Posted:' + dataObj['Nugget.Tag']  + '</div>');
        console.log(results);
        $('#result').html(results.join(''));
        
        
        var query = new Parse.Query(Nugget).equalTo("Source");

        query.find({
          success: function(results) {
            /*alert("success");*/
            alert(JSON.stringify(results));
            $(".success").show();     
          },
          error: function(error) {
            alert("error");
            $(".error").show();
          }
        });
        
        return false; 
    });
});
