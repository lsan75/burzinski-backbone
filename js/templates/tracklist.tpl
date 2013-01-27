<% _.each(collection, function(res) { %> 

	<li><a href="#1" title="<%= res.ttl %>"  data-songid="<%= res.songid %>"><%= res.ttl %></a></li>

<% }); %>