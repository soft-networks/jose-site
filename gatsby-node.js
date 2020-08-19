const locales = {
  en: {
    path: "en",
    locale: "English",
    default: true,
  },
  es: {
    path: "es",
    locale: "Spanish",
  },
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  // Query all the pieces / projects and get their slug
  // We need this slug -> piece mapping because we'll create a piece for each slug, and we reference the piece by its slug in pieceData.
  // We could have just used ID here too?
  const result = await graphql(`
    query {
      allPiecesJson {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  if (result.error) {
    reporter.panic("There was an error")
    return
  }

  //Now go through every piece, and create a page for Each piece using the pieceDetail component
  const pieces = result.data.allPiecesJson.edges
  const pieceDetail = require.resolve(`./src/templates/pieceDetail.js`)
  pieces.forEach(({ node }) => {
    let slug = node.slug
    //We create a page where the "path" == slug,
    //The template we "render" into the page is the pieceDetail template that we imported
    //The "context" here passes the data that the query needs within pieceDetail
    actions.createPage({
      path: `${slug}`,
      component: pieceDetail,
      context: { slug },
    })
  })
}

//This function goes in and for EVERY PAGE deletes it and RECREATES another page for it in spanish
//An optimization here is that we can not delete it, and just create *an extra one* in spanish
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  return new Promise(resolve => {
    deletePage(page)

    Object.keys(locales).map(lang => {
      const localizedPath = locales[lang].default
        ? page.path
        : locales[lang].path + page.path

      const originalPath = page.path

      return createPage({
        ...page,
        path: localizedPath,
        context: {
          locale: lang,
          originalPath: originalPath,
        },
      })
    })

    resolve()
  })
}
