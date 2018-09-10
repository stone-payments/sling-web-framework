
## Contributing ##  
  
Please read this doc before start to use this repo. We have a set of guidelines that should be followed.  
  
Feel free to propose changes to this document using a pull request.  
  
* Code patterns  
  
### Available Scripts ###  
  
Local Development enviroment  
```  
npm start (component-name)
```  
Build for production  
```  
npm run build  
```  
Run unit testing  
```  
npm test  
```  
  
### Git Workflow ###  
  
We use [GitFlow](http://nvie.com/posts/a-successful-git-branching-model/).  
  
### Branching  
- ```feature/feature-name``` to new features.  
- ```fix/bug-name``` to fix bugs.  
- ```improvement/improvement-name``` to improvement code.  
  
### Commit messages ###  

- Feel free to commit clear messages, in **english** to describe every single change in your branch.  
- We use [conventional commits](https://conventionalcommits.org/) as guidelines for merge commits.
  
### Pull Requests ###  
  
All Pull Request must be made to the `develop branch`.  
  
Before opening a Pull Request, verify if all tests ppassesassed,   
we have CI tools to run tests, if it fails [you will be notified](https://www.youtube.com/watch?v=mmLRTVYgEq4).  
  
  
### Releasing a new version ###

Open a PR to the develop and master branchs.