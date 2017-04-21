# clay-utils
Utility functions for working with Clay

# Installation

```
npm install --save nymag-handlebars
```

---

# Utils

### getComponentName

Get component name from uri

#### Params

* `uri` _string_

**Returns** _string|null_

#### Example

```js
getComponentName('nymag.com/press/components/base/instances/foobarbaz@published')
//=> 'base'

```

### getComponentInstance

Get component instance from uri

#### Params

* `uri` _string_

**Returns** _string|null_

#### Example

```js
getComponentInstance('nymag.com/press/components/base/instances/foobarbaz@published')
//=> 'foobarbaz'

```
