module.exports = `     {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement":
    [

        {

            "@type": "ListItem",
            "position": 1,
            "item": {
                "@id": "https://www.zoopla.co.uk/",
                "name": "Zoopla"
            }
        }
        ,
        {

            "@type": "ListItem",
            "position": 2,
            "item": {
                "@id": "https://www.zoopla.co.uk/for-sale/",
                "name": "For sale"
            }
        }
        ,
        {

            "@type": "ListItem",
            "position": 3,
            "item": {
                "@id": "https://www.zoopla.co.uk/for-sale/property/london/",
                "name": "London"
            }
        }
        ,
        {

            "@type": "ListItem",
            "position": 4,
            "item": {
                "@id": "https://www.zoopla.co.uk/for-sale/property/south-london/",
                "name": "South London"
            }
        }
        ,
        {

            "@type": "ListItem",
            "position": 5,
            "item": {
                "@id": "https://www.zoopla.co.uk/for-sale/property/greenwich/",
                "name": "Greenwich"
            }
        }
        ,
        {

            "@type": "ListItem",
            "position": 6,
            "item": {
                "@id": "https://www.zoopla.co.uk/for-sale/property/london/victoria-way/",
                "name": "Victoria Way"
            }
        }
    ]
}


{
  "@context": "http://schema.org/",
  "@graph": [
     {
        "@type": "WebSite",
        "name": "Zoopla",
        "alternateName": "Zoopla Property Search",
        "url": "https://www.zoopla.co.uk"
     },
     {
        "@type": "Organization",
        "name": "Zoopla Property Group",
        "logo": "https://m.zoocdn.com/www/_b/static/images/logo-alt-1f707a76e0.png",
        "url": "https://www.zoopla.co.uk"
     },
     {
        "@type": "RealEstateAgent",
        "name": "Nested",
        "url": "https://www.zoopla.co.uk/find-agents/branch/nested-london-77168/",
        "logo": {
          "@type": "ImageObject",
          "contentUrl": "https://st.zoocdn.com/zoopla_static_agent_logo_(548222).png"
        },
        "image": "https://st.zoocdn.com/zoopla_static_agent_logo_(548222).png",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Nested, 9 Dallington Street, London",
          "postalCode": "EC1V 0LN"
        }
     },
     {
        "@type": "Residence",
        "name": "4 bed terraced house for sale",
        "description": "4 bed terraced house for sale in Victoria Way, Charlton SE7, selling for £650,000 from Nested. See property details on Zoopla or browse all our range of properties in Victoria Way, Charlton SE7.",
        "address": {
           "@type": "PostalAddress",
           "streetAddress": "Victoria Way, Charlton SE7",
           "addressLocality": "London",
           "addressRegion": "London"
        },
        "geo": {
           "@type": "GeoCoordinates",
           "latitude": "51.483893",
           "longitude": "0.026893"
        },
        "photo": [
          {
            "@type": "ImageObject",
            "contentUrl": "https://lid.zoocdn.com/645/430/197dc390bc20c1f7a5c1135232f0afe36c7a17a5.png"
          },
          {
            "@type": "ImageObject",
            "contentUrl": "https://lid.zoocdn.com/645/430/fcaa36eac303ea19f74c93e3eaa2f3f0d105bafc.png"
          },
          {
            "@type": "ImageObject",
            "contentUrl": "https://lid.zoocdn.com/645/430/28d69406992adf99566d79b341ea2f385d2a0964.jpg"
          }
        ]
     }
  ]
}
`;
