<?php
require_once dirname(__FILE__).'/tao/includes/raw_start.php';

function fileTypeValid($file, $type)
{
    if (!$file || substr($file, -(strlen($type) + 1)) != '.'.$type) {
        echo 'invalid file type : '.$file;
        echo PHP_EOL;
        return false;
    }
    if (!file_exists($file)) {
        $file = dirname(__FILE__).'/'.$file;
        if (!file_exists($file)) {
            echo 'file not found : '.$file;
            echo PHP_EOL;
            return false;
        }
    }
    return $file;
}
/**
 * Sample usage :
 * sudo -u www-data php taoTool.php --qti-to-json taoQtiItem/views/js/test/samples/qtiv2p1/choice_custom/qti.xml
 */
switch ($argv[1]) {
    case '--decode':
        echo PHP_EOL;
        echo  \tao_helpers_Uri::decode($argv[2]);
        echo PHP_EOL;
        break;
    case '--encode':
        echo PHP_EOL;
        echo  \tao_helpers_Uri::encode($argv[2]);
        echo PHP_EOL;
        break;
    case '--qti-to-json':
        $file = fileTypeValid($argv[2], 'xml');
        if ($file) {
            //process
            $qtiParser = new oat\taoQtiItem\model\qti\Parser($file);
            $item      = $qtiParser->load();

            $splFile = new SplFileInfo($file);
            $destFile =
                $splFile->getPath() .
                '/' .
                $splFile->getBasename('.xml') .
                '.json';

            file_put_contents($destFile, json_encode($item->toArray(), JSON_PRETTY_PRINT) . "\n");

            //result
            echo PHP_EOL;
            echo json_encode($item->toArray(), JSON_PRETTY_PRINT);
            echo PHP_EOL;
            echo PHP_EOL;
        }
        break;
    default:
        echo 'unknown command';
        echo PHP_EOL;
}