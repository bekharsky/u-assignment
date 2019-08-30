1. What controversies do you see in the following API example?
   1. When working with a collection representation, creating a new member of the collection should be POST /users. When with member representation – POST /users/:id. But not POST /users/new, it neither both.
   2. It's better to use HTTP verb PATCH to update collection member and point to member, not on it's methods like "update", "rename" or "update-timezone".
   3. DELETE should be pointed to member, not to collection method. Like DELETE /users/:id, not DELETE /users/delete?id=:id.
   4. Errors codes should be either return in HTTP status code (here we can use 409 Conflict) or in the response body when we rely on the application state. HTTP status 200 is about success, not error.
2. What issues do you see in the following CSS file?
   1. Importing font families like that (@import) leads us to visible fonts problem (font will not appear or will "flash").
   2. Duplicate usage of color in the second selector. Unneeded !important usage (although !important should not be used anywhere anyway).
   3. The .lftn and div > a > span > .blue selectors both had an problem with understanding them. Also, usage of tag (not class or id) selectors always leads us to an unexpected behaviors.
   4. The .box selector has a bunch of rules that can be collapsed to "margin" shorthand. Also units must be presented in the margin rule.
3. What problems related to password security can you see in the following example?
   1. The md5 hashing in the Digest Authentication is weak and can be bruteforced.
   2. In case of 1, salt "trustno1" is too obvious to recognize.
   3. There is no any password weakness check like length or special symbols usage.
4. What would you give as a feedback for a pull request including this code?
   1. One should check that all requested properties are presented in the user object.
   2. Declarative style (reduce usage) would be more appropriate for that type of summation.
   3. Usage of var inside "for" construction is not a good practice in modern JavaScript.
   4. One should check type of deposits[i].amount before do a summation.
5. What issues do you see in this JavaScript function?
   1. The u variable is not defined;
   2. The convsPath and msgsPath variables should be declared as const to prevent their accidental reassigning.
   3. There is no check for the neither response status code nor conversations type. Also response status code check is omitted in the next fetch call.
   4. Messy "messagesURL" fetching without any type checking.
6. What would you give as a feedback for a pull request including this code?
   1. Typechecking before summation should be presented.
   2. In this case it's better to use isCredit condition, not !isCredit.
   3. One should check to hasOwnProperty before work with properties in the object prototype methods.
7. React frontend assignment
   1. In the attachment
