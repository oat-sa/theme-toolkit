# Profile generator

## What's this?

If you have a lot of profiles to manage then you will like this one, it generates three entries for each customer.

- *customer* to compile both platform and item theme
- *customer-items* to compile only the item theme
- *customer-platform* to compile only the platform theme

Assumed, your customer is called *Smith* and the extension *taoSmith* you get something like
```
    {
        "smith": {
            "src": "../tao/taoSmith/views/scss/themes",
            "dest": "../tao/taoSmith/views/css/themes"
        },
        "smith-items": {
            "src": "../tao/taoSmith/views/scss/themes/items",
            "dest": "../tao/taoSmith/views/css/themes/items"
        },
        "smith-platform": {
            "src": "../tao/taoSmith/views/scss/themes/platform",
            "dest": "../tao/taoSmith/views/css/themes/platform"
        }
    }
```
## Configuration

In `generator.php` edit the two first variables:
- `$taoPath` is the path to your local TAO installation, absolute or relative to your tool-kit.
- `$customers` is the list of customers you want to create profiles for, entries should be in lower-case.
- `$targets` for now there are *platform* and *items*, *(empty string, meaning all)*  will be added automatically 


## Execution

Run the script in your favorite web browser. We could have done something a lot more fancy or a maybe a command line script but essentially this was a quick hack where writing the readme took more time than the actual coding.
