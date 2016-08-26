<?php

// path to your local TAO installation, absolute or relative to your toolkit
$taoPath   = '';

// List of customers you want to create profiles for. 
$customers = [];

// that's it - now run this in your favorite web browser
header('Content-Type: text/plain; charset=utf-8');


$profiles  = [];

foreach($customers as $customer) {
	$profiles[] = [
		$customer => [
			'src' => sprintf('%s/tao%s/views/scss/themes', $taoPath, ucfirst($customer)),
			'dest' => sprintf('%s/tao%s/views/css/themes', $taoPath, ucfirst($customer)), 
		],		
		$customer . '-items' => [
			'src' => sprintf('%s/tao%s/views/scss/themes/items', $taoPath, ucfirst($customer)),
			'dest' => sprintf('%s/tao%s/views/css/themes/items', $taoPath, ucfirst($customer)), 
		],		
		$customer . '-platform' => [
			'src' => sprintf('%s/tao%s/views/scss/themes/platform', $taoPath, ucfirst($customer)),
			'dest' => sprintf('%s/tao%s/views/css/themes/platform', $taoPath, ucfirst($customer)), 
		]
	];
}

print str_replace(['\\/', '[', ']'], ['/', '{', '}'], json_encode($profiles, JSON_PRETTY_PRINT));
