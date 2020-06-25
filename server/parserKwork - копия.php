<?PHP

header("Access-Control-Allow-Origin: * ");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin");
header('P3P: CP="CAO PSA OUR"');
header("Content-Type: application/json; charset=utf-8");


include 'phpquery-master/phpQuery/phpQuery.php';
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
/**
* Парсер Kwork.ru
* 
**/
$url = 'https://kwork.ru/projects?';
$i = 0;
$category = 'c=11'; //($_POST['category']) ? 'c=' . $_POST['category'] : 'c=1';
$rangePriceMin = false; //($_POST['rangePriceMin']) ?  $_POST['rangePriceMin']  : false;
$rangePriceMax = false; //($_POST['rangePriceMax']) ?  $_POST['rangePriceMax']  : false;
$pageNum = 0;
$breakpoint = 1;
$website = 'kwork';

$kwork = [];

$url = $url . $category;

function kworkParser($url, &$kwork, $category, $pageNum, $breakpoint, $rangePriceMax, $rangePriceMin, $website, $i){

   

	$connectKWORK = curl_init();
	$arHeaderList = array();
	$arHeaderList[] = 'Accept: application/json;charsrt:utf-8';
	$arHeaderList[] = 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36 OPR/65.0.3467.78';
	curl_setopt_array($connectKWORK, array(
	    CURLOPT_URL => $url,
	    CURLOPT_HTTPHEADER => $arHeaderList,
	    CURLOPT_FOLLOWLOCATION => true,
	    CURLOPT_RETURNTRANSFER => true,
	    CURLOPT_FRESH_CONNECT => true,
	));
	$result = curl_exec($connectKWORK);
	curl_close($connectKWORK);

	$document = phpQuery::newDocument($result);

	foreach($document->find('.card.want-card') as  $box){

		$i++;

		$box = pq($box); //pq - аналог $ в jQuery
		
		$href = $box->find('.wants-card__header-title a')->attr('href');
		$title = $box->find('.wants-card__header-title a')->text();
		$price = preg_replace('/[^0-9](fs12)?/i', '', $box->find('.wants-card__header-price.wants-card__price.m-hidden'));	
		$description = (preg_replace('/Скрыть/i', '', $box->find(".first-letter.hidden")->text())) ? preg_replace('/Скрыть/i', '', $box->find(".first-letter.hidden")->text()) : $box->find(".first-letter")->text();
		
		// echo '<br><br>'.$i . '<br>';
		// echo $href . '<br>';
		// echo $title . '<br>';
		// echo $price . '<br>';
		// echo $description . '<br><br>';
		$id = rand(0, 999999);


		if($rangePriceMin && $rangePriceMax){
			if((int)$rangePriceMin <= (int)$price && (int)$rangePriceMax >= (int)$price ){
				$kwork['kwork'][$i]['id'] = $id;
				$kwork['kwork'][$i]['title'] = $title;
				$kwork['kwork'][$i]['href'] = $href;
				$kwork['kwork'][$i]['price'] = $price;
				$kwork['kwork'][$i]['description'] = $description;
				$kwork['kwork'][$i]['website'] = $website;
			};
		}else if($rangePriceMin){
			if((int)$rangePriceMin <= (int)$price){
				$kwork['kwork'][$i]['id'] = $id;
				$kwork['kwork'][$i]['title'] = $title;
				$kwork['kwork'][$i]['href'] = $href;
				$kwork['kwork'][$i]['price'] = $price;
				$kwork['kwork'][$i]['description'] = $description;
				$kwork['kwork'][$i]['website'] = $website;
			};
		}else if($rangePriceMax){
			if((int)$rangePriceMin >= (int)$price){
				$kwork['kwork'][$i]['id'] = $id;
				$kwork['kwork'][$i]['title'] = $title;
				$kwork['kwork'][$i]['href'] = $href;
				$kwork['kwork'][$i]['price'] = $price;
				$kwork['kwork'][$i]['description'] = $description;
				$kwork['kwork'][$i]['website'] = $website;
			};
		}else{
			$kwork['kwork'][$i]['id'] = $id;
			$kwork['kwork'][$i]['title'] = $title;
			$kwork['kwork'][$i]['href'] = $href;
			$kwork['kwork'][$i]['price'] = $price;
			$kwork['kwork'][$i]['description'] = $description;
			$kwork['kwork'][$i]['website'] = $website;
		};

	}
	$pageNum += 1;
	$page = '&page=' . $pageNum;
	$url = preg_replace('/(c\=[0-9]{1,3})?&page=+[0-9]{1,3}/', '', $url);
	$url = $url . $category . $page;
	if($pageNum == $breakpoint){
		return $kwork;
	};

	kworkParser($url, $kwork, $category, $pageNum, $breakpoint, $rangePriceMax, $rangePriceMin, $website, $i);
};




kworkParser($url, $kwork, $category, $pageNum, $breakpoint, $rangePriceMax, $rangePriceMin, $website, $i);

// echo $data = json_encode($kwork, JSON_UNESCAPED_UNICODE);

echo $data = json_encode($kwork );
// echo $kwork;
// var_dump( json_encode($kwork));
