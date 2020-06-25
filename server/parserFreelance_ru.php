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
* Парсер freelance_ru.ru
*
1. Дизайн - spec=40
2. Разработка и IT - spec=116
3. Тексты и переводы - spec=124
4. SEO - spec=673
5. Соцсети - -----
6. Аудио  - spec=89
7. Бизнес spec=663 
**/

$url = 'https://freelance.ru/projects/?';
$i = 0;
$category = "spec=" . $_GET["spec"]; //($_POST['category']) ? 'c=' . $_POST['category'] : 'c=1';
$pageNum = 0;
$breakpoint = 10;
$website = 'freelance_ru';

$freelance_ru = [];

$url = $url . $category;

function freelance_ruParser($url, &$freelance_ru, $category, $pageNum, $breakpoint, $website, $i){
	$connectfreelance_ru = curl_init();
	$arHeaderList = array();
	$arHeaderList[] = 'Accept: application/json;charsrt: utf-8';
	$arHeaderList[] = 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36 OPR/65.0.3467.78';
	curl_setopt_array($connectfreelance_ru, array(
	    CURLOPT_URL => $url,
	    CURLOPT_HTTPHEADER => $arHeaderList,
	    CURLOPT_FOLLOWLOCATION => true,
	    CURLOPT_RETURNTRANSFER => true,
	    CURLOPT_FRESH_CONNECT => true,
	));
	$result = curl_exec($connectfreelance_ru);
	curl_close($connectfreelance_ru);
	$result = iconv("windows-1251", "UTF-8", $result);

	$document = phpQuery::newDocument($result);
	foreach($document->find('.proj') as  $box){

		$i++;

		$box = pq($box); //pq - аналог $ в jQuery
		
		$href = "https://freelance.ru" . $box->find('.p_title .ptitle')->attr('href');
		$title = $box->find('.p_title a span')->text();
		$price = preg_replace('/(Бюджет: )?(р\.)?( +)?/i', '', $box->find('.descr .visible-xs.cost_xs')->text());	
		$description = (preg_replace('/Бюджет:( +)(\d+)?( +)?(\d+)?( +)?(р\.)?(Договорная)?/i', '', $box->find(".descr p span")->text()));
		
		$id = rand(0, 999999);

		// echo "<br /><br />". $i ."<br />";
		// echo $href . "<br />";
		// echo $id . "<br />";
		// echo $title . "<br />";
		// echo $price . "<br />";
		// echo $description . "<br /><br />";
	
		$freelance_ru['freelance_ru'][$i]['id'] = $id;
		$freelance_ru['freelance_ru'][$i]['title'] = $title;
		$freelance_ru['freelance_ru'][$i]['href'] = $href;
		$freelance_ru['freelance_ru'][$i]['price'] = $price;
		$freelance_ru['freelance_ru'][$i]['description'] = $description;
		$freelance_ru['freelance_ru'][$i]['website'] = $website;
		

	}
	$pageNum += 1;
	$page = '&page=' . $pageNum;
	$url = preg_replace('/(spec\=[0-9]{1,3})?&page=+[0-9]{1,3}/', '', $url);
	$url = $url . $category . $page;
	if($pageNum == $breakpoint){
		return $freelance_ru;
	};

	freelance_ruParser($url, $freelance_ru, $category, $pageNum, $breakpoint , $website, $i);
};




freelance_ruParser($url, $freelance_ru, $category, $pageNum, $breakpoint  , $website, $i);

// echo $data = json_encode($freelance_ru, JSON_UNESCAPED_UNICODE);

echo $data = json_encode($freelance_ru );
// echo $freelance_ru;
// var_dump( json_encode($freelance_ru));
