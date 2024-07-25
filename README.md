https://github.com/serhiijun/birdel

```js
import { ActorElement } from "birdeljs";

ActorElement.toggleDropdown({bel: <b_el>})
ActorElement.closeDropdown({bel: <b_el>})
ActorElement.toggleSelect({bel: <b_el>})
ActorElement.closeSel({bel: <b_el>})
ActorElement.selectItem({bel: <b_el>})
ActorElement.selectRadio({bel: <b_el>})
ActorElement.toggleCheckbox({bel: <b_el>})
ActorElement.selectCheckbox({bel: <b_el>})
ActorElement.unselectCheckbox({bel: <b_el>})
ActorElement.toggleModal({bel: <b_el>})
```

```html
<!--Select-->
<div class="bsel" bel-group="some-group" bel-name="some-name">
  <div class="bsel__head">
    <div class="bsel__list__item" data-value="my-value">
      Item html
    </div>
  </div>
  <div class="bsel__list">
    <div class="bsel__list__item" data-value="my-value">
      Item html
    </div>
  </div>
</div>
```

```js
// Select element
const el = document.querySelector('.my-element')
const bel = new BelSelect({bel: el})
bel.select({item, highlight})
bel.currentValue()
```

```js
// Bri Select
<div bri-sl>
  <div class="button">
    <div class="left">
      <div bri-sl--itm-def>
      </div>
    </div>
    <div class="right arrow">
    </div>
  </div>
  <div bri-sl--lst>
    <div bri-sl--itm>
      Some html or text here
    </div>
    <div bri-sl--itm>
      Some html or text here
    </div>
  </div>
</div>
```

```js
// Bri Checkbox
<div bri-cb>
</div>
```

```js
// Bri radio button
<div bri-rb>
</div>
```

```js
// Bri Dropdown
<div bri-dd>
</div>
```

```js
// Bri textinput
<input type="text" bri-ti>
</input>
```

```js
// Bri textarea
<textarea bri-ta>
  It was a dark and stormy night...
</textarea>
```

```js
// Bri content editable
<div contenteditable="true" bri-ce>
  We can edit this in a div lol
</div>
```

