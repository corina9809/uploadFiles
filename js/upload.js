$(function()
    {
        console.log( "ready!" );
        // Check for the various File API support.
        if (window.File && window.FileReader && window.FileList && window.Blob)
        {
            //alert("This browser supports file loading...");
            $('#load-text-file').change(function(evt){ return handleFileSelect(evt, $('#textInput')); } );
            $('#load-html-file').change(function(evt){ return handleFileSelect(evt, $('#htmlInput')); } );
        }
        else
        {
            alert('The File APIs are not fully supported in this browser.');
        }
    }
);

function saveText(ref, fname, text, mime)
{
    var blob = new Blob([text], {type: mime});
    saveAs(blob, fname);

    return false;
}


function handleFileSelect(evt, target)
{
    var files = evt.target.files;
    if( files.length > 1 )
    {
        alert("Multiple files not supported...");
    }

    //alert(JSON.stringify(files,null,2));
    file = files[0];
    $(evt.target).prev('.file-details').html(file.name + " " + " size " + file.size + " type " + file.type + " last modified " + file.lastModifiedDate );

    var reader = new FileReader();
    // Closure to capture the file information.
    reader.onload = (
        function(theFile)
        {
            return function(e)
            {
                target.html( e.target.result );
            };
        }
    )(file);

    // Read in the image file as a data URL.
    reader.readAsText(file);
}
