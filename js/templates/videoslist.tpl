<article id="<%= model.ids %>">
			
	<h2><a href="<%= model.url %>" title="<%= model.ttl %>"><%= model.ttl %></a></h2><!--
	--><cite><%= model.dte %></cite> 
	
	<p class="video">
		<iframe width="900" height="500" src="http://www.youtube.com/embed/<%= model.vid %>?wmode=opaque" frameborder="0" allowfullscreen=""></iframe>
	</p>
	
	<%= model.cnt %>

	<footer></footer>
		
</article>
