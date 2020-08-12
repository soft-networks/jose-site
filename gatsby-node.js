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
