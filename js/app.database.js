/* Creating the database and make sure it is up and running.
* @return NO
*/
function initDB() {
    // Check if the browser/device support this database type.
    if(Modernizr.websqldatabase) {
        // Create a new web SQL database.
        database = openDatabase('imagesDB', '0.2', 'Saved images', 2 * 1024 * 1024);
        if(database) { 
            // Create table if not exists.
            database.transaction(function(tx){
                tx.executeSql("CREATE TABLE IF NOT EXISTS images(id INTEGER PRIMARY KEY AUTOINCREMENT, image TEXT, added DATETIME)", []);
            });
        }
    } else {
        // If no support, hide the save button.
        $("#save").addClass("hidden");
    }
};