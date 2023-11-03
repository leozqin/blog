---
title: "Introducing ETL Markup Toolkit (EMT)"
description: A declarative framework for defining spark transformations that you should NOT use
date: 2021-03-31
tldr: I developed an open source toolkit for writing Spark-native ETL using configurations in a highly sub-scriptable and transparent way. You can find it at https://github.com/leozqin/etl-markup-toolkit
slug: etl-markup-toolkit
tags:
- hall-of-fame
---
## A Note from the Future
I do not recommend that you use this software, because it is not maintained, loved, or thought about with any regularity. 

I wrote it at a time when I was deeply disenchanted with ETL tooling after an experience with Pentaho that could only described as brutal. We were told that using Pentaho would expose data transformations transparently without code. What ended up happening? Nothing was really transparent because variable injection is frustratingly opaque, and all the good stuff ended up in code anyway, because it was more performant. Disappointing.

However - I am proud to have written it. Using configuration to abstract data transformations is feasible and reasonable - but can't replace well written and well-architected code. 

## Introduction
As it pertains to ETL, the world of data engineering is quite peculiar. As the name suggests, most ETL use cases involve extracting data from a relational or relational-ish databases, transforming it to meet business requirements, and loading it into another database or database-like appliance (eg, Hive).

As such, great energy is spent making the connection out of the database and into its destination as seamless as possible. While this is rational because of the plethora of databases out there, it also means that nobody really thinks about the best way to do the transformations in between.

To date, there are have only been a few options for transforming data in between its source and target systems – you can use SQL and a templating system (a la dbt or many others), or a UI-based tool such as Pentaho or Informatica, or you can write your transformations in code – such as with pandas, dask , or Spark.

I wrote ETL Markup Toolkit (EMT) to try and combine the expressiveness and compactness of code-based ETL, the low bar of entry and feature-completeness of UI-based tools, and well developed API and natural parallelism of Spark.

## What is EMT?
EMT is an open-source, Spark-native toolkit for defining ETL transformations in a transparent, human-readable and sub-scriptable manner. You can get it at https://github.com/leozqin/etl-markup-toolkit

What does that all mean?

- Open-source: EMT is open source under the MIT License
- Spark-native: written in Python, EMT wraps the pyspark API to deliver a variety of different actions
- ETL transformations: EMT provides 30 different actions that transform data in sequence within a workflow
- Transparent: EMT emits detailed json-style reporting about the outcome of a workflow, including things such as the data that was read, where it was written, what columns were observed, and the row count at each step (optional, since this does incur a cost to performance)
- Human-readable: EMT workflows are configured using YAML, which is human readable, commonly used, and 100% compatible with common source control tools.
- Sub-scriptable: EMT workflows can be injected with fixed external references at runtime, or can also reference configurations in other files.

To learn more about this, including examples and documentation about the different actions, start with the README.

With the remainder of this piece, I will discuss why EMT works the way that it works.

## Why EMT?
### Iron Triangles
As discussed before, I feel like there is sort of an Iron Triangle when it comes to developing ETL.

SQL is well known, simple, and it plays very nicely with Extracting and Loading into relational databases. However, it’s hard to unit test (although dbt does an adequate job of that), and is inherently less expressive than a general purpose programming language.

UI-based tools are intuitive and user-friendly with a less severe learning curve than general purpose programming languages. They’re also, generally speaking, an easier sell to management on the basis of transparency. There’s a particular niche of ETL developer who is exclusively trained in these tools, and less familiar with general purpose programming languages.

UI-based tools, however, are prone to anti-patterns, both in the inner-platform effect, as well as a tendency for ETL developers to figure out that writing ETL in code is actually more performant than using the built-in functions, which defeats the purpose of having a GUI to begin with.

Finally, code-based tools such as pandas, dask, and spark are very expressive and versatile, but of course come at a penalty of learning curve, and their general permissiveness allows anti-patterns and inefficiency to go undetected without careful oversight and discipline in code review.

In short, I might characterize the iron triangle of ETL processing frameworks to be something like this: Expressiveness vs Transparency vs Discipline.

EMT falls on the sides of Transparency and Discipline. By providing a full suite of spark-native workflow actions, EMT seeks to provide some of the structure that UI based tools benefit from, while still enjoying the embarassingly parallel nature of Spark.

## Data Lakes
Another thing to consider is that data lakes, particularly ones that involve writing to object storage, are gaining in popularity. In this use case, data arrives in the form of files in a filesystem. So, there is no SQL-based extraction step to be done, they can be accessed directly as files.

So – in this use case, what is the point of overlaying a SQL-like semantic layer such as Hive? Other than allowing developers to use SQL as a processing language, if there is inherently structured schema from which data can be read, creating and maintaining a hive metastore is actually a lot of work.

Compounding the issue, the hive metastore is a functional data store, but it’s not particularly useful for documentation purposes or for exposing data lineage. That’s essentially the challenge for master data management and data cataloging solutions such as Alation or (open source) Apache Atlas.

All this being the case, if your data is processed in a data lake fashion and has minimal relational endpoints, you may be better served skipping the hassle of maintaining a hive metastore.

EMT thrives with this kind of use case – rather than writing broad support for every jdbc protocol under the sun, EMT instead seeks to provide clean, idiomatic, and consistent ways of transforming data at rest after it has been extracted and before it is loaded into its destination system.

## Parallelism
Another primary driver of processing data using a data lake storage model is larger-than-memory data scale. At such scale, it is natural to seek out ways to parallelize data processing.

In the SQL world, Hive and Presto are natural and easy ways to do this. But, what if you didn’t want to use SQL, either for the reasons explained above, or because your use case requires a high level of test isolation and detailed business logic?

UI-based tools all claim to support parallel processing in some way, but I have yet to find one that actually works at scale. Sometimes, the performance is not comparable or the state of the art, or the built-in functionality is severely limited when using parallel processing.

Other times, I find that support for these features are lacking. Given the rate of proliferation of different database systems, especially in the analytics space, it is easy to quantify your progress in terms of database systems supported. However – this does come at the cost of improving support for parallelism, especially when most use cases can be well support by SQL.

If your use case is larger-than-memory and has minimal interaction with relational endpoints (or, you have an existing process for loading data into such endpoints from the data lake), EMT may be a good fit for you.