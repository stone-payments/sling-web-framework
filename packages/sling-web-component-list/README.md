# sling-web-component-list

Sling Card Basic Component.

## Install

```
npm install sling-web-component-list
```

## Tag

```HTML
  <sling-list></sling-list>
```

## Dependencies

* **sling-framework**
* **sling-helpers**

## Attributes and properties

|Name|Type|Default Values|ReflectToAttribute|Observer|callSdk|
|:--|:--|:--|:--:|:--|:--:|
|srcdata|Array|||
|srckeys|Array|||
|cascadelist|Boolean|**false**|:heavy_check_mark:|

### Description

|Name|Description|
|:---|:---|
|srcdata |Uma lista que define o conteudo do componente..|
|srckeys|Uma lista de chaves que dispõe com base na lista de dados a ordem dos dados.|
|cascadelist|Define se a lista vai ser em cascata ou não.|

## Events

This component have no events.

### Usage

```HTML
    <sling-list
      srcdata=""
      srckeys="">
    </sling-list>

    <script>
      const keys = [
        'Descrição',
        'UF',
        'Cidade',
        'Endereço',
        'Número',
        'Complemento',
        'Bairro',
      ];

      const data = [
        {
          Descrição: 'teste',
          UF: 'teste',
          Cidade: 'teste',
          Endereço: 'teste',
          Número: 'teste',
          Complemento: 'teste',
          Bairro: 'teste',
        },
      ]

      const $list = Array.from(document.querySelectorAll('sling-list'));
      $list.forEach($list=> {
        $list.srcdata = data;
        $list.srckeys = keys;
      });
    </script>
```

![image](https://user-images.githubusercontent.com/22959060/46169828-82201100-c272-11e8-918a-05f1faa8dcfa.png)
