## Performance

---
### Database Indexing

"It optimizes the database querying speed by serving as an organized lookup table with pointers to the location of the requested data." - first thing on Google

To confirm the columns have been indexed;

- In the migrations files (for 'users' and 'rocks'), you can see where I've added/dropped the indexes to these tables, marked with comments.

- After running the migrations, SQLite viewer in VSCode doesn't seem to have a way to see which fields have been indexed.

- You can see them using the Sqlite3 CLI:
<ul>
<details>
<ul>
<li>You may need to install sqlite3 globally (?)</li>

<li>run: sqlite3 ~…/my-fullstack-collection/server/db/dev.sqlite3 (the full path to the database file)</li>

<li>run: PRAGMA index_list(users); (has to include the semi-colon)
			§ if it gives you an error, try running .quit and start again</li>

<li>You should see something like "0|users_name_index|0|c|0", which shows that the 'name' column has been indexed. index_list(rocks) should show one too.</li>

<li>PRAGMA index_info(users_name_index); shows something else about the given index but idk what it means.</li>

<li>.quit exits the sqlite3 CLI</li>
</ul>
</details>
</ul>

---
### Gzip Compression

Sends data in http responses in zip format, making them smaller and faster.

To see that data sent in responses have this format;

- In the server.ts file, I've commented two lines where I've imported compression from the compression library, and 'used' it with express. This means that everything that comes from the server will have gzip compression.

- You can see the content encoding header in devtools:
<ul>
<details>
<ul>
<li>Run the server, and type one of the api endpoints in the address bar</li>
<ul>eg. http://localhost:5173/api/v1/rocks</ul>

<li>In the network tab in devtools, click the name of the 'rocks' thingy to see it's headers</li>

<li>Under Headers>Response Headers, you should see 'Content-Encoding: gzip'</li>
<ul>
<li>Note that if you refresh the page, this header won't be visible anymore, possibly because it's cached somewhere in the browser.</li>
<li>To see it again, you need to hard refresh (shift+refresh)</li>
</ul>

</ul>
</details>
</ul>