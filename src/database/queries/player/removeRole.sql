UPDATE players SET roles = array_remove(roles, $1) 
WHERE steamid = $2;