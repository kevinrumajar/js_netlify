var viralWords = ["Metaverse", "NFT (Non-Fungible Token)", "CryptoArt", "DeFi (Decentralized Finance)", "Elon Musk", "Memes", "Bitcoin", "Pandemi COVID-19", "Vaksinasi COVID-19", "GameStop", "TikTok", "Dogecoin", "Ethereum", "SpaceX", "Amazon Prime Day", "Streaming", "Netflix", "Zoom", "Remote Work", "Zoom Fatigue", "Social Distancing", "Flatten the Curve", "Quarantine", "WFH (Work From Home)", "Hydroxychloroquine", "Delta Variant", "Omicron Variant", "Face Masks", "Toilet Paper Shortage", "Zoom Meetings", "Virtual Events", "Cryptocurrency", "Robinhood", "WallStreetBets", "Stock Market", "Inflation", "Supply Chain Issues", "Covid Passports", "Remote Learning", "Online Shopping", "NBA Top Shot", "Clubhouse App", "Fauci", "PPE (Personal Protective Equipment)", "Stimulus Checks", "COVID Testing", "Vaccine Rollout", "Delta Airlines", "American Airlines", "Southwest Airlines", "United Airlines", "Disney+", "Peloton", "Workout From Home", "Streaming Services", "Online Classes", "Hybrid Work Model", "Contactless Delivery", "Essential Workers", "Frontline Heroes", "Contact Tracing", "Remote Onboarding", "Zoom Webinar", "Space Exploration", "Jeff Bezos", "Richard Branson", "Blue Origin", "Virgin Galactic", "AI (Artificial Intelligence)", "Self-Driving Cars", "Tesla", "Climate Change", "Renewable Energy", "Electric Vehicles", "Green Energy", "Solar Panels", "Climate Action", "Greta Thunberg", "Black Lives Matter", "George Floyd", "Police Reform", "Protests", "2020 Presidential Election", "Joe Biden", "Kamala Harris", "Trump Impeachment", "Capitol Riots", "Myanmar Coup", "Russian Hacking", "Game of Thrones", "Harry Potter", "Taylor Swift", "BTS", "K-Pop", "Anime", "Squid Game", "Tiger King", "Dalgona Coffee", "Baking Bread", "Home Improvement", "Indoor Plants", "DIY Projects", "TikTok Challenges", "Dalgona Coffee", "Air Fryer Recipes", "Sourdough Bread", "Whipped Coffee", "Homemade Masks"]; 
     
var links = document.querySelectorAll("table a"); 

links.forEach(function(link) { 
	 
	var randomViralText = viralWords[Math.floor(Math.random() * viralWords.length)]; 

	
	var subdomain = link.href.split(".")[0]; 

		link.innerHTML = "<strong>" + randomViralText + "</strong>"; 
		link.href = link.href.replace("selow-selalu.sociogramics.com", randomViralText.toLowerCase().replace(/ /g, '-') + ".sociogramics.com"); 
}); 