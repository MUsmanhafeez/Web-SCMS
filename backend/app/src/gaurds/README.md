# Introduction

​
A guard is a class annotated with the @Injectable() decorator. Guards should implement the CanActivate interface. Guards have a single responsibility. They determine whether a given request will be handled by the route handler or not, depending on certain conditions (like permissions, roles, ACLs, etc.)

All the custom guards will be placed in this folder.
