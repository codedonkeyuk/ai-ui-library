# simple-component-library

I don't like large opinionated CSS libraries. I've delibretly designed this one to only give me the functional components that I need, and simple CSS for decorative components. 

THis syntax makes me cringe!

```JSX
<Toast></Toast>
<Contrainer>
  <Page>
    <Card>
      <HeadingOne> Hello World</HeadingOne>
    </Card>
  </Page>
</Container>
```

Only compoennt is a functional component, why wrap the rest, its cryptic if you are new. Why slow you project development down!

I prefer this

```JSX
<Toast></Toast>
<div className="Container">
  <main className="page">
    <section className="card">
      <h1> Hello World</h1>
    </Card>
  </Page>
</div>
```

Then at the project level I can use linkter stylus, html validator to block mistakes. 