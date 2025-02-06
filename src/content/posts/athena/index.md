---
title: "AWS Athena is Awesome, Actually."
date: 2023-12-30
slug: aws-athena-is-awesome
tags:
- tech
- cloud
---
I'll say it - AWS Athena is criminally underrated as a platform for processing complex, non-interactive business data workloads.

I think that Athena has a bit of a reputation for being more of a json-wrangling, log-querying tool than one for business-centric workloads. However, I suspect that this is largely because AWS loves to cross-promote its products, so Cloudwatch features prominently in the documentation. It is, in fact, equally proficient for business data if you know what you're getting yourself into.

At work, our data platform uses AWS Athena as the primary SQL compute engine - initially, I was skeptical about that choice architecturally - it felt like the choice of tool that was available, rather than what as optimal. However, as we've increased usage, I continue to be pleasantly surprised at how well it works for what we use it for - namely non-interactive complex transformations of modest amounts of data.

I think that AWS Athena's primary virtue is its pricing model - $5 per TB of data scanned from s3. We use parquet storage with gzip compression, so columnar access and pushdown is very much in-play, to help reduce the amount of data scanned. At our level of scale, we end up spending more on the data storage than we do for compute - most of our tables (periodically re-built dbt models orchestrated by Dagster) are simple drop-and-replace; usually the choice to build incremental models is guided by business requirement rather than sensitivity to cost or performance.

The other benefit of the pricing model is that it is based on data scanned, not compute time. This allows us (and also analyst users) to write pretty naive, complex, and unoptimized SQL queries - Athena scales so aggressively that almost all queries somewhere between 10 and 30 seconds, no matter their size. And - excepting a few edge cases - poorly written, redundant, and optimized queries don't have any cost impact because they result in around the same amount of data scanned.

Another architectural decision informed by the pricing model is in how we store our data. Obviously using parquet is beneficial to enable columnar access, but our choice to use gzip compression is also somewhat unusual; I typically see snappy used for compression, specifically because its less CPU intensive to de-compress, at the expense of some compression efficiency. However - since Athena scales CPU so aggressively, we're more than happy to save the cost in storage and data scanned by using the more CPU-intensive algorithm for compression.

This all being said, there are, of course, a few use cases where Athena is less than ideal -

1. Since all queries, big or small, take roughly the same amount of time, really simple queries do take longer than is ideal - this is definitely not the technology you'd want to use for interactive analytics or similar.
2. It's gotten better since Athena Engine v3, but the degree to which Athena uses Trino vs Presto is still not clear to me; reading the documentation, it's apparently a bit of both? Every now and then, I accidentally dispense bad advice to users based on what the Trino documentation says when I should have been using Presto, or vice-versa...
3. For an equivalent amount of data, we might be able to save some cost on the extremely iterative, analytical type of query - for maintaining curated tables, Athena is still quite cost-effective.

All in all, I recommend for readers to consider using Athena the next time they need to run a SQL workload on data stored in s3 - especially if it's already been converted to a columnar format. I think that doing so would especially work very well for maintaining curated tables, or providing a sandbox for users to explore data than be stood up extremely quickly (while this observation stands for Redshift, this is true even more so when you factor in the time and energy it takes to do corporate procurement for something like Databricks or Snowflake.)
