<?php

// path to your local TAO installation, absolute or relative to your toolkit
$taoPath = '';

// List of customers you want to create profiles for. 
$customers = [];

// List of targets, for now there is only items or platform
$targets = ['platform', 'items'];

// that's it - now run this in your favorite web browser
header('Content-Type: text/plain; charset=utf-8');


$profiles  = [];
$targets[] = '';

foreach ($customers as $customer) {
    foreach ($targets as $target) {
        $profiles[implode('-', array_filter([$customer, $target]))] = [
            'src'  => sprintf('%s/tao%s/views/scss/themes', $taoPath, ucfirst($customer)),
            'dest' => sprintf('%s/tao%s/views/css/themes', $taoPath, ucfirst($customer)),
        ];
    }
}

print str_replace(['\\/', '[', ']'], ['/', '{', '}'], json_encode($profiles, JSON_PRETTY_PRINT));
