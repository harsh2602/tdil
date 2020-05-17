### HTML 5.1 <picture> tag

#### MDN Documentation: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture

This week I decided to learn about `Flexbox and CSS Grid` through a Frontend Masters [Jen Kramer's Course](https://frontendmasters.com/courses/css-grids-flexbox/). During the course, she highlighted about the HTML5.1 `<picture>` tag as means to improve performance.

Suppose I have a responsive web page where I have separate layout I want to render an image. It would be a bad idea to load the same size image for all screen types:  **Mobile, Tablet** or **Desktop**. A large image on desktop/laptop is fine where most probably the user is on a faster wi-fi network. But that would be a bad choice on a mobile device with a slower data connection.

In that case, we could have different images for different screen sizes.
Let's suppose I have three images for `Chelsea Football Club` logo.

* Large Size - For screen width > 1200px
* Medium Size - For width between 767px and 1200px
* Small Size - For width less than 767px

How would my HTML layout look like using the picture tag in my HTML webpage:

```
<div class="logo">
  <picture>
    <source srcset="./img/chelsea-logo-original.jpg" media="(min-width: 1200px)" />
    <source srcset="./img/chelsea-logo-500.jpg" media="(min-width: 768px)">
    <img src="img/chelsea-logo-150.jpg" alt="Chelsea Logo at small dimension">
  </picture>
</div>
```

#### Note: In the above code the numbers 150 and 500 tell the dimension of image I have.

- In the above code, for a screen with min-width 1200 px and above `chelsea-logo-original.jpg` will be shown. 

- For width ranging from 768px to less than 1200px, `chelsea-logo-500.jpg` will be shown.

- For anything less, `chelsea-logo-150.jpg` will be shown.

Now let's look as to how it works:

1. ```<picture>``` tag contains zero or more ```<source>``` tag and one <img> tag to offer alternative versions of an image for different display scenarios.

2. The browser will consider each ```<source>``` tag to decide the best match. If none matches(or if browser does not support ```<picture>```), ```<img>``` acts as the fallback.


4. ```<source>``` has three main attributes to it based on which browser decides what to load. The browsers get the attribute values from the `user-agent`. They are:
 - `srcset`: The list of possible images to offer based on size. 
 List meaning you can pass comma separated values of logo to the attribute in the above example.
 - `media`: the media query
 - `type`: specifies the `MIME` type of the resource url. If not specified, type is retreived from the server and checked to see if the `user agent` can handle it. If not, the next source is checked. If specified, then it is compared against the types the user agent presents. If no match with the user agent happens, the next ```<source>``` is checked.

Initially, I had said that the ```<picture>``` had performance advantages. That's because, only the image pertaining to the screen with is downloaded over the network. So, our original image which (while the time of me writing) is 1.6 MB, is not downloaded if I am viewing the screen on my One Plus 6 which is 412px wide. The image downloaded for the logo is 100KB. 

#### NOTE: A better format for loading would be to have my image in the webp format rather than the .jpg(or .png) format which are much smaller in size for the same resolution.

#### Polyfill

Refer to the [caniuse](https://caniuse.com/#feat=picture) to determine whether you need to use the polyfill for the picture tag.
Scott Jhel has a polyfill called [Picturefill](https://scottjehl.github.io/picturefill/) that helps polfill for unsupported browsers.

To start you would need to add Picturefill in the script tag
In the ```<head>``` tag of your webpage, add the following code:

```
<head>
  <script>
    // Picture element HTML5 shiv
    document.createElement( "picture" );
  </script>
  <script src="picturefill.js" async></script>
</head>
```
