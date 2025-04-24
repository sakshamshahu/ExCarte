
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model users
 * 
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>
/**
 * Model user_preferences
 * 
 */
export type user_preferences = $Result.DefaultSelection<Prisma.$user_preferencesPayload>
/**
 * Model places
 * 
 */
export type places = $Result.DefaultSelection<Prisma.$placesPayload>
/**
 * Model reviews
 * 
 */
export type reviews = $Result.DefaultSelection<Prisma.$reviewsPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.users.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.users.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs>;

  /**
   * `prisma.user_preferences`: Exposes CRUD operations for the **user_preferences** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more User_preferences
    * const user_preferences = await prisma.user_preferences.findMany()
    * ```
    */
  get user_preferences(): Prisma.user_preferencesDelegate<ExtArgs>;

  /**
   * `prisma.places`: Exposes CRUD operations for the **places** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Places
    * const places = await prisma.places.findMany()
    * ```
    */
  get places(): Prisma.placesDelegate<ExtArgs>;

  /**
   * `prisma.reviews`: Exposes CRUD operations for the **reviews** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reviews
    * const reviews = await prisma.reviews.findMany()
    * ```
    */
  get reviews(): Prisma.reviewsDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    users: 'users',
    user_preferences: 'user_preferences',
    places: 'places',
    reviews: 'reviews'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "users" | "user_preferences" | "places" | "reviews"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.usersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
      user_preferences: {
        payload: Prisma.$user_preferencesPayload<ExtArgs>
        fields: Prisma.user_preferencesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.user_preferencesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_preferencesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.user_preferencesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_preferencesPayload>
          }
          findFirst: {
            args: Prisma.user_preferencesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_preferencesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.user_preferencesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_preferencesPayload>
          }
          findMany: {
            args: Prisma.user_preferencesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_preferencesPayload>[]
          }
          create: {
            args: Prisma.user_preferencesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_preferencesPayload>
          }
          createMany: {
            args: Prisma.user_preferencesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.user_preferencesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_preferencesPayload>[]
          }
          delete: {
            args: Prisma.user_preferencesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_preferencesPayload>
          }
          update: {
            args: Prisma.user_preferencesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_preferencesPayload>
          }
          deleteMany: {
            args: Prisma.user_preferencesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.user_preferencesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.user_preferencesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_preferencesPayload>
          }
          aggregate: {
            args: Prisma.User_preferencesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser_preferences>
          }
          groupBy: {
            args: Prisma.user_preferencesGroupByArgs<ExtArgs>
            result: $Utils.Optional<User_preferencesGroupByOutputType>[]
          }
          count: {
            args: Prisma.user_preferencesCountArgs<ExtArgs>
            result: $Utils.Optional<User_preferencesCountAggregateOutputType> | number
          }
        }
      }
      places: {
        payload: Prisma.$placesPayload<ExtArgs>
        fields: Prisma.placesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.placesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$placesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.placesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$placesPayload>
          }
          findFirst: {
            args: Prisma.placesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$placesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.placesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$placesPayload>
          }
          findMany: {
            args: Prisma.placesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$placesPayload>[]
          }
          create: {
            args: Prisma.placesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$placesPayload>
          }
          createMany: {
            args: Prisma.placesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.placesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$placesPayload>[]
          }
          delete: {
            args: Prisma.placesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$placesPayload>
          }
          update: {
            args: Prisma.placesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$placesPayload>
          }
          deleteMany: {
            args: Prisma.placesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.placesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.placesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$placesPayload>
          }
          aggregate: {
            args: Prisma.PlacesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlaces>
          }
          groupBy: {
            args: Prisma.placesGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlacesGroupByOutputType>[]
          }
          count: {
            args: Prisma.placesCountArgs<ExtArgs>
            result: $Utils.Optional<PlacesCountAggregateOutputType> | number
          }
        }
      }
      reviews: {
        payload: Prisma.$reviewsPayload<ExtArgs>
        fields: Prisma.reviewsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.reviewsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.reviewsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewsPayload>
          }
          findFirst: {
            args: Prisma.reviewsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.reviewsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewsPayload>
          }
          findMany: {
            args: Prisma.reviewsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewsPayload>[]
          }
          create: {
            args: Prisma.reviewsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewsPayload>
          }
          createMany: {
            args: Prisma.reviewsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.reviewsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewsPayload>[]
          }
          delete: {
            args: Prisma.reviewsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewsPayload>
          }
          update: {
            args: Prisma.reviewsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewsPayload>
          }
          deleteMany: {
            args: Prisma.reviewsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.reviewsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.reviewsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewsPayload>
          }
          aggregate: {
            args: Prisma.ReviewsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReviews>
          }
          groupBy: {
            args: Prisma.reviewsGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReviewsGroupByOutputType>[]
          }
          count: {
            args: Prisma.reviewsCountArgs<ExtArgs>
            result: $Utils.Optional<ReviewsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    preferences: number
    reviews: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    preferences?: boolean | UsersCountOutputTypeCountPreferencesArgs
    reviews?: boolean | UsersCountOutputTypeCountReviewsArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountPreferencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: user_preferencesWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: reviewsWhereInput
  }


  /**
   * Count Type PlacesCountOutputType
   */

  export type PlacesCountOutputType = {
    reviews: number
  }

  export type PlacesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reviews?: boolean | PlacesCountOutputTypeCountReviewsArgs
  }

  // Custom InputTypes
  /**
   * PlacesCountOutputType without action
   */
  export type PlacesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlacesCountOutputType
     */
    select?: PlacesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PlacesCountOutputType without action
   */
  export type PlacesCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: reviewsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersMinAggregateOutputType = {
    id: string | null
    auth_id: string | null
    first_name: string | null
    last_name: string | null
    email: string | null
    birth_date: Date | null
    explorer_type: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UsersMaxAggregateOutputType = {
    id: string | null
    auth_id: string | null
    first_name: string | null
    last_name: string | null
    email: string | null
    birth_date: Date | null
    explorer_type: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    auth_id: number
    first_name: number
    last_name: number
    email: number
    birth_date: number
    explorer_type: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type UsersMinAggregateInputType = {
    id?: true
    auth_id?: true
    first_name?: true
    last_name?: true
    email?: true
    birth_date?: true
    explorer_type?: true
    created_at?: true
    updated_at?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    auth_id?: true
    first_name?: true
    last_name?: true
    email?: true
    birth_date?: true
    explorer_type?: true
    created_at?: true
    updated_at?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    auth_id?: true
    first_name?: true
    last_name?: true
    email?: true
    birth_date?: true
    explorer_type?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id: string
    auth_id: string
    first_name: string
    last_name: string
    email: string
    birth_date: Date
    explorer_type: string
    created_at: Date
    updated_at: Date
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    auth_id?: boolean
    first_name?: boolean
    last_name?: boolean
    email?: boolean
    birth_date?: boolean
    explorer_type?: boolean
    created_at?: boolean
    updated_at?: boolean
    preferences?: boolean | users$preferencesArgs<ExtArgs>
    reviews?: boolean | users$reviewsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    auth_id?: boolean
    first_name?: boolean
    last_name?: boolean
    email?: boolean
    birth_date?: boolean
    explorer_type?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectScalar = {
    id?: boolean
    auth_id?: boolean
    first_name?: boolean
    last_name?: boolean
    email?: boolean
    birth_date?: boolean
    explorer_type?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    preferences?: boolean | users$preferencesArgs<ExtArgs>
    reviews?: boolean | users$reviewsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type usersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      preferences: Prisma.$user_preferencesPayload<ExtArgs>[]
      reviews: Prisma.$reviewsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      auth_id: string
      first_name: string
      last_name: string
      email: string
      birth_date: Date
      explorer_type: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {usersCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends usersCreateManyAndReturnArgs>(args?: SelectSubset<T, usersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    preferences<T extends users$preferencesArgs<ExtArgs> = {}>(args?: Subset<T, users$preferencesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_preferencesPayload<ExtArgs>, T, "findMany"> | Null>
    reviews<T extends users$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, users$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the users model
   */ 
  interface usersFieldRefs {
    readonly id: FieldRef<"users", 'String'>
    readonly auth_id: FieldRef<"users", 'String'>
    readonly first_name: FieldRef<"users", 'String'>
    readonly last_name: FieldRef<"users", 'String'>
    readonly email: FieldRef<"users", 'String'>
    readonly birth_date: FieldRef<"users", 'DateTime'>
    readonly explorer_type: FieldRef<"users", 'String'>
    readonly created_at: FieldRef<"users", 'DateTime'>
    readonly updated_at: FieldRef<"users", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users createManyAndReturn
   */
  export type usersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
  }

  /**
   * users.preferences
   */
  export type users$preferencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_preferences
     */
    select?: user_preferencesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_preferencesInclude<ExtArgs> | null
    where?: user_preferencesWhereInput
    orderBy?: user_preferencesOrderByWithRelationInput | user_preferencesOrderByWithRelationInput[]
    cursor?: user_preferencesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: User_preferencesScalarFieldEnum | User_preferencesScalarFieldEnum[]
  }

  /**
   * users.reviews
   */
  export type users$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    where?: reviewsWhereInput
    orderBy?: reviewsOrderByWithRelationInput | reviewsOrderByWithRelationInput[]
    cursor?: reviewsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewsScalarFieldEnum | ReviewsScalarFieldEnum[]
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
  }


  /**
   * Model user_preferences
   */

  export type AggregateUser_preferences = {
    _count: User_preferencesCountAggregateOutputType | null
    _avg: User_preferencesAvgAggregateOutputType | null
    _sum: User_preferencesSumAggregateOutputType | null
    _min: User_preferencesMinAggregateOutputType | null
    _max: User_preferencesMaxAggregateOutputType | null
  }

  export type User_preferencesAvgAggregateOutputType = {
    interest_level: number | null
  }

  export type User_preferencesSumAggregateOutputType = {
    interest_level: number | null
  }

  export type User_preferencesMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    category: string | null
    interest_level: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type User_preferencesMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    category: string | null
    interest_level: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type User_preferencesCountAggregateOutputType = {
    id: number
    user_id: number
    category: number
    interest_level: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type User_preferencesAvgAggregateInputType = {
    interest_level?: true
  }

  export type User_preferencesSumAggregateInputType = {
    interest_level?: true
  }

  export type User_preferencesMinAggregateInputType = {
    id?: true
    user_id?: true
    category?: true
    interest_level?: true
    created_at?: true
    updated_at?: true
  }

  export type User_preferencesMaxAggregateInputType = {
    id?: true
    user_id?: true
    category?: true
    interest_level?: true
    created_at?: true
    updated_at?: true
  }

  export type User_preferencesCountAggregateInputType = {
    id?: true
    user_id?: true
    category?: true
    interest_level?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type User_preferencesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user_preferences to aggregate.
     */
    where?: user_preferencesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_preferences to fetch.
     */
    orderBy?: user_preferencesOrderByWithRelationInput | user_preferencesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: user_preferencesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_preferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_preferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned user_preferences
    **/
    _count?: true | User_preferencesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: User_preferencesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: User_preferencesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: User_preferencesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: User_preferencesMaxAggregateInputType
  }

  export type GetUser_preferencesAggregateType<T extends User_preferencesAggregateArgs> = {
        [P in keyof T & keyof AggregateUser_preferences]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser_preferences[P]>
      : GetScalarType<T[P], AggregateUser_preferences[P]>
  }




  export type user_preferencesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: user_preferencesWhereInput
    orderBy?: user_preferencesOrderByWithAggregationInput | user_preferencesOrderByWithAggregationInput[]
    by: User_preferencesScalarFieldEnum[] | User_preferencesScalarFieldEnum
    having?: user_preferencesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: User_preferencesCountAggregateInputType | true
    _avg?: User_preferencesAvgAggregateInputType
    _sum?: User_preferencesSumAggregateInputType
    _min?: User_preferencesMinAggregateInputType
    _max?: User_preferencesMaxAggregateInputType
  }

  export type User_preferencesGroupByOutputType = {
    id: string
    user_id: string
    category: string
    interest_level: number
    created_at: Date
    updated_at: Date
    _count: User_preferencesCountAggregateOutputType | null
    _avg: User_preferencesAvgAggregateOutputType | null
    _sum: User_preferencesSumAggregateOutputType | null
    _min: User_preferencesMinAggregateOutputType | null
    _max: User_preferencesMaxAggregateOutputType | null
  }

  type GetUser_preferencesGroupByPayload<T extends user_preferencesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<User_preferencesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof User_preferencesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], User_preferencesGroupByOutputType[P]>
            : GetScalarType<T[P], User_preferencesGroupByOutputType[P]>
        }
      >
    >


  export type user_preferencesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    category?: boolean
    interest_level?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user_preferences"]>

  export type user_preferencesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    category?: boolean
    interest_level?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user_preferences"]>

  export type user_preferencesSelectScalar = {
    id?: boolean
    user_id?: boolean
    category?: boolean
    interest_level?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type user_preferencesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type user_preferencesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $user_preferencesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "user_preferences"
    objects: {
      user: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      category: string
      interest_level: number
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["user_preferences"]>
    composites: {}
  }

  type user_preferencesGetPayload<S extends boolean | null | undefined | user_preferencesDefaultArgs> = $Result.GetResult<Prisma.$user_preferencesPayload, S>

  type user_preferencesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<user_preferencesFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: User_preferencesCountAggregateInputType | true
    }

  export interface user_preferencesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['user_preferences'], meta: { name: 'user_preferences' } }
    /**
     * Find zero or one User_preferences that matches the filter.
     * @param {user_preferencesFindUniqueArgs} args - Arguments to find a User_preferences
     * @example
     * // Get one User_preferences
     * const user_preferences = await prisma.user_preferences.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends user_preferencesFindUniqueArgs>(args: SelectSubset<T, user_preferencesFindUniqueArgs<ExtArgs>>): Prisma__user_preferencesClient<$Result.GetResult<Prisma.$user_preferencesPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User_preferences that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {user_preferencesFindUniqueOrThrowArgs} args - Arguments to find a User_preferences
     * @example
     * // Get one User_preferences
     * const user_preferences = await prisma.user_preferences.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends user_preferencesFindUniqueOrThrowArgs>(args: SelectSubset<T, user_preferencesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__user_preferencesClient<$Result.GetResult<Prisma.$user_preferencesPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User_preferences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_preferencesFindFirstArgs} args - Arguments to find a User_preferences
     * @example
     * // Get one User_preferences
     * const user_preferences = await prisma.user_preferences.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends user_preferencesFindFirstArgs>(args?: SelectSubset<T, user_preferencesFindFirstArgs<ExtArgs>>): Prisma__user_preferencesClient<$Result.GetResult<Prisma.$user_preferencesPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User_preferences that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_preferencesFindFirstOrThrowArgs} args - Arguments to find a User_preferences
     * @example
     * // Get one User_preferences
     * const user_preferences = await prisma.user_preferences.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends user_preferencesFindFirstOrThrowArgs>(args?: SelectSubset<T, user_preferencesFindFirstOrThrowArgs<ExtArgs>>): Prisma__user_preferencesClient<$Result.GetResult<Prisma.$user_preferencesPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more User_preferences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_preferencesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all User_preferences
     * const user_preferences = await prisma.user_preferences.findMany()
     * 
     * // Get first 10 User_preferences
     * const user_preferences = await prisma.user_preferences.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const user_preferencesWithIdOnly = await prisma.user_preferences.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends user_preferencesFindManyArgs>(args?: SelectSubset<T, user_preferencesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_preferencesPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User_preferences.
     * @param {user_preferencesCreateArgs} args - Arguments to create a User_preferences.
     * @example
     * // Create one User_preferences
     * const User_preferences = await prisma.user_preferences.create({
     *   data: {
     *     // ... data to create a User_preferences
     *   }
     * })
     * 
     */
    create<T extends user_preferencesCreateArgs>(args: SelectSubset<T, user_preferencesCreateArgs<ExtArgs>>): Prisma__user_preferencesClient<$Result.GetResult<Prisma.$user_preferencesPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many User_preferences.
     * @param {user_preferencesCreateManyArgs} args - Arguments to create many User_preferences.
     * @example
     * // Create many User_preferences
     * const user_preferences = await prisma.user_preferences.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends user_preferencesCreateManyArgs>(args?: SelectSubset<T, user_preferencesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many User_preferences and returns the data saved in the database.
     * @param {user_preferencesCreateManyAndReturnArgs} args - Arguments to create many User_preferences.
     * @example
     * // Create many User_preferences
     * const user_preferences = await prisma.user_preferences.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many User_preferences and only return the `id`
     * const user_preferencesWithIdOnly = await prisma.user_preferences.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends user_preferencesCreateManyAndReturnArgs>(args?: SelectSubset<T, user_preferencesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_preferencesPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User_preferences.
     * @param {user_preferencesDeleteArgs} args - Arguments to delete one User_preferences.
     * @example
     * // Delete one User_preferences
     * const User_preferences = await prisma.user_preferences.delete({
     *   where: {
     *     // ... filter to delete one User_preferences
     *   }
     * })
     * 
     */
    delete<T extends user_preferencesDeleteArgs>(args: SelectSubset<T, user_preferencesDeleteArgs<ExtArgs>>): Prisma__user_preferencesClient<$Result.GetResult<Prisma.$user_preferencesPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User_preferences.
     * @param {user_preferencesUpdateArgs} args - Arguments to update one User_preferences.
     * @example
     * // Update one User_preferences
     * const user_preferences = await prisma.user_preferences.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends user_preferencesUpdateArgs>(args: SelectSubset<T, user_preferencesUpdateArgs<ExtArgs>>): Prisma__user_preferencesClient<$Result.GetResult<Prisma.$user_preferencesPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more User_preferences.
     * @param {user_preferencesDeleteManyArgs} args - Arguments to filter User_preferences to delete.
     * @example
     * // Delete a few User_preferences
     * const { count } = await prisma.user_preferences.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends user_preferencesDeleteManyArgs>(args?: SelectSubset<T, user_preferencesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more User_preferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_preferencesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many User_preferences
     * const user_preferences = await prisma.user_preferences.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends user_preferencesUpdateManyArgs>(args: SelectSubset<T, user_preferencesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User_preferences.
     * @param {user_preferencesUpsertArgs} args - Arguments to update or create a User_preferences.
     * @example
     * // Update or create a User_preferences
     * const user_preferences = await prisma.user_preferences.upsert({
     *   create: {
     *     // ... data to create a User_preferences
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User_preferences we want to update
     *   }
     * })
     */
    upsert<T extends user_preferencesUpsertArgs>(args: SelectSubset<T, user_preferencesUpsertArgs<ExtArgs>>): Prisma__user_preferencesClient<$Result.GetResult<Prisma.$user_preferencesPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of User_preferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_preferencesCountArgs} args - Arguments to filter User_preferences to count.
     * @example
     * // Count the number of User_preferences
     * const count = await prisma.user_preferences.count({
     *   where: {
     *     // ... the filter for the User_preferences we want to count
     *   }
     * })
    **/
    count<T extends user_preferencesCountArgs>(
      args?: Subset<T, user_preferencesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], User_preferencesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User_preferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {User_preferencesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends User_preferencesAggregateArgs>(args: Subset<T, User_preferencesAggregateArgs>): Prisma.PrismaPromise<GetUser_preferencesAggregateType<T>>

    /**
     * Group by User_preferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_preferencesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends user_preferencesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: user_preferencesGroupByArgs['orderBy'] }
        : { orderBy?: user_preferencesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, user_preferencesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUser_preferencesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the user_preferences model
   */
  readonly fields: user_preferencesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for user_preferences.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__user_preferencesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the user_preferences model
   */ 
  interface user_preferencesFieldRefs {
    readonly id: FieldRef<"user_preferences", 'String'>
    readonly user_id: FieldRef<"user_preferences", 'String'>
    readonly category: FieldRef<"user_preferences", 'String'>
    readonly interest_level: FieldRef<"user_preferences", 'Int'>
    readonly created_at: FieldRef<"user_preferences", 'DateTime'>
    readonly updated_at: FieldRef<"user_preferences", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * user_preferences findUnique
   */
  export type user_preferencesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_preferences
     */
    select?: user_preferencesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_preferencesInclude<ExtArgs> | null
    /**
     * Filter, which user_preferences to fetch.
     */
    where: user_preferencesWhereUniqueInput
  }

  /**
   * user_preferences findUniqueOrThrow
   */
  export type user_preferencesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_preferences
     */
    select?: user_preferencesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_preferencesInclude<ExtArgs> | null
    /**
     * Filter, which user_preferences to fetch.
     */
    where: user_preferencesWhereUniqueInput
  }

  /**
   * user_preferences findFirst
   */
  export type user_preferencesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_preferences
     */
    select?: user_preferencesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_preferencesInclude<ExtArgs> | null
    /**
     * Filter, which user_preferences to fetch.
     */
    where?: user_preferencesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_preferences to fetch.
     */
    orderBy?: user_preferencesOrderByWithRelationInput | user_preferencesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for user_preferences.
     */
    cursor?: user_preferencesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_preferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_preferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of user_preferences.
     */
    distinct?: User_preferencesScalarFieldEnum | User_preferencesScalarFieldEnum[]
  }

  /**
   * user_preferences findFirstOrThrow
   */
  export type user_preferencesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_preferences
     */
    select?: user_preferencesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_preferencesInclude<ExtArgs> | null
    /**
     * Filter, which user_preferences to fetch.
     */
    where?: user_preferencesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_preferences to fetch.
     */
    orderBy?: user_preferencesOrderByWithRelationInput | user_preferencesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for user_preferences.
     */
    cursor?: user_preferencesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_preferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_preferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of user_preferences.
     */
    distinct?: User_preferencesScalarFieldEnum | User_preferencesScalarFieldEnum[]
  }

  /**
   * user_preferences findMany
   */
  export type user_preferencesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_preferences
     */
    select?: user_preferencesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_preferencesInclude<ExtArgs> | null
    /**
     * Filter, which user_preferences to fetch.
     */
    where?: user_preferencesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_preferences to fetch.
     */
    orderBy?: user_preferencesOrderByWithRelationInput | user_preferencesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing user_preferences.
     */
    cursor?: user_preferencesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_preferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_preferences.
     */
    skip?: number
    distinct?: User_preferencesScalarFieldEnum | User_preferencesScalarFieldEnum[]
  }

  /**
   * user_preferences create
   */
  export type user_preferencesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_preferences
     */
    select?: user_preferencesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_preferencesInclude<ExtArgs> | null
    /**
     * The data needed to create a user_preferences.
     */
    data: XOR<user_preferencesCreateInput, user_preferencesUncheckedCreateInput>
  }

  /**
   * user_preferences createMany
   */
  export type user_preferencesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many user_preferences.
     */
    data: user_preferencesCreateManyInput | user_preferencesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user_preferences createManyAndReturn
   */
  export type user_preferencesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_preferences
     */
    select?: user_preferencesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many user_preferences.
     */
    data: user_preferencesCreateManyInput | user_preferencesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_preferencesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * user_preferences update
   */
  export type user_preferencesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_preferences
     */
    select?: user_preferencesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_preferencesInclude<ExtArgs> | null
    /**
     * The data needed to update a user_preferences.
     */
    data: XOR<user_preferencesUpdateInput, user_preferencesUncheckedUpdateInput>
    /**
     * Choose, which user_preferences to update.
     */
    where: user_preferencesWhereUniqueInput
  }

  /**
   * user_preferences updateMany
   */
  export type user_preferencesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update user_preferences.
     */
    data: XOR<user_preferencesUpdateManyMutationInput, user_preferencesUncheckedUpdateManyInput>
    /**
     * Filter which user_preferences to update
     */
    where?: user_preferencesWhereInput
  }

  /**
   * user_preferences upsert
   */
  export type user_preferencesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_preferences
     */
    select?: user_preferencesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_preferencesInclude<ExtArgs> | null
    /**
     * The filter to search for the user_preferences to update in case it exists.
     */
    where: user_preferencesWhereUniqueInput
    /**
     * In case the user_preferences found by the `where` argument doesn't exist, create a new user_preferences with this data.
     */
    create: XOR<user_preferencesCreateInput, user_preferencesUncheckedCreateInput>
    /**
     * In case the user_preferences was found with the provided `where` argument, update it with this data.
     */
    update: XOR<user_preferencesUpdateInput, user_preferencesUncheckedUpdateInput>
  }

  /**
   * user_preferences delete
   */
  export type user_preferencesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_preferences
     */
    select?: user_preferencesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_preferencesInclude<ExtArgs> | null
    /**
     * Filter which user_preferences to delete.
     */
    where: user_preferencesWhereUniqueInput
  }

  /**
   * user_preferences deleteMany
   */
  export type user_preferencesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user_preferences to delete
     */
    where?: user_preferencesWhereInput
  }

  /**
   * user_preferences without action
   */
  export type user_preferencesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_preferences
     */
    select?: user_preferencesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_preferencesInclude<ExtArgs> | null
  }


  /**
   * Model places
   */

  export type AggregatePlaces = {
    _count: PlacesCountAggregateOutputType | null
    _avg: PlacesAvgAggregateOutputType | null
    _sum: PlacesSumAggregateOutputType | null
    _min: PlacesMinAggregateOutputType | null
    _max: PlacesMaxAggregateOutputType | null
  }

  export type PlacesAvgAggregateOutputType = {
    latitude: number | null
    longitude: number | null
    average_rating: number | null
    total_reviews: number | null
    heat_score: number | null
    google_average_rating: number | null
    google_total_reviews: number | null
  }

  export type PlacesSumAggregateOutputType = {
    latitude: number | null
    longitude: number | null
    average_rating: number | null
    total_reviews: number | null
    heat_score: number | null
    google_average_rating: number | null
    google_total_reviews: number | null
  }

  export type PlacesMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    category: string | null
    latitude: number | null
    longitude: number | null
    address: string | null
    city: string | null
    average_rating: number | null
    total_reviews: number | null
    heat_score: number | null
    created_at: Date | null
    updated_at: Date | null
    googleMapsUri: string | null
    websiteUri: string | null
    nationalPhoneNumber: string | null
    internationalPhoneNumber: string | null
    take_out: boolean | null
    delivery: boolean | null
    dine_in: boolean | null
    reservable: boolean | null
    serves_breakfast: boolean | null
    serves_lunch: boolean | null
    serves_dinner: boolean | null
    serves_beer: boolean | null
    serves_wine: boolean | null
    serves_brunch: boolean | null
    serves_vegetarian_food: boolean | null
    outdoor_seating: boolean | null
    live_music: boolean | null
    menu_for_children: boolean | null
    serves_cocktails: boolean | null
    serves_dessert: boolean | null
    serves_coffee: boolean | null
    good_for_children: boolean | null
    restroom: boolean | null
    good_for_groups: boolean | null
    good_for_watching_sports: boolean | null
    priceLevel: string | null
    timeZone: string | null
    acceptsCreditCards: boolean | null
    acceptsDebitCards: boolean | null
    acceptsCashOnly: boolean | null
    acceptsNfc: boolean | null
    freeParkingLot: boolean | null
    freeStreetParking: boolean | null
    paidParkingLot: boolean | null
    valetParking: boolean | null
    wheelchairAccessibleParking: boolean | null
    wheelchairAccessibleEntrance: boolean | null
    wheelchairAccessibleRestroom: boolean | null
    wheelchairAccessibleSeating: boolean | null
    directionsUri: string | null
    placeUri: string | null
    writeAReviewUri: string | null
    reviewsUri: string | null
    photosUri: string | null
    google_average_rating: number | null
    google_total_reviews: number | null
  }

  export type PlacesMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    category: string | null
    latitude: number | null
    longitude: number | null
    address: string | null
    city: string | null
    average_rating: number | null
    total_reviews: number | null
    heat_score: number | null
    created_at: Date | null
    updated_at: Date | null
    googleMapsUri: string | null
    websiteUri: string | null
    nationalPhoneNumber: string | null
    internationalPhoneNumber: string | null
    take_out: boolean | null
    delivery: boolean | null
    dine_in: boolean | null
    reservable: boolean | null
    serves_breakfast: boolean | null
    serves_lunch: boolean | null
    serves_dinner: boolean | null
    serves_beer: boolean | null
    serves_wine: boolean | null
    serves_brunch: boolean | null
    serves_vegetarian_food: boolean | null
    outdoor_seating: boolean | null
    live_music: boolean | null
    menu_for_children: boolean | null
    serves_cocktails: boolean | null
    serves_dessert: boolean | null
    serves_coffee: boolean | null
    good_for_children: boolean | null
    restroom: boolean | null
    good_for_groups: boolean | null
    good_for_watching_sports: boolean | null
    priceLevel: string | null
    timeZone: string | null
    acceptsCreditCards: boolean | null
    acceptsDebitCards: boolean | null
    acceptsCashOnly: boolean | null
    acceptsNfc: boolean | null
    freeParkingLot: boolean | null
    freeStreetParking: boolean | null
    paidParkingLot: boolean | null
    valetParking: boolean | null
    wheelchairAccessibleParking: boolean | null
    wheelchairAccessibleEntrance: boolean | null
    wheelchairAccessibleRestroom: boolean | null
    wheelchairAccessibleSeating: boolean | null
    directionsUri: string | null
    placeUri: string | null
    writeAReviewUri: string | null
    reviewsUri: string | null
    photosUri: string | null
    google_average_rating: number | null
    google_total_reviews: number | null
  }

  export type PlacesCountAggregateOutputType = {
    id: number
    name: number
    description: number
    category: number
    latitude: number
    longitude: number
    address: number
    city: number
    images: number
    tags: number
    opening_hours: number
    average_rating: number
    total_reviews: number
    heat_score: number
    created_at: number
    updated_at: number
    googleMapsUri: number
    websiteUri: number
    nationalPhoneNumber: number
    internationalPhoneNumber: number
    take_out: number
    delivery: number
    dine_in: number
    reservable: number
    serves_breakfast: number
    serves_lunch: number
    serves_dinner: number
    serves_beer: number
    serves_wine: number
    serves_brunch: number
    serves_vegetarian_food: number
    outdoor_seating: number
    live_music: number
    menu_for_children: number
    serves_cocktails: number
    serves_dessert: number
    serves_coffee: number
    good_for_children: number
    restroom: number
    good_for_groups: number
    good_for_watching_sports: number
    priceLevel: number
    timeZone: number
    acceptsCreditCards: number
    acceptsDebitCards: number
    acceptsCashOnly: number
    acceptsNfc: number
    freeParkingLot: number
    freeStreetParking: number
    paidParkingLot: number
    valetParking: number
    wheelchairAccessibleParking: number
    wheelchairAccessibleEntrance: number
    wheelchairAccessibleRestroom: number
    wheelchairAccessibleSeating: number
    directionsUri: number
    placeUri: number
    writeAReviewUri: number
    reviewsUri: number
    photosUri: number
    google_average_rating: number
    google_total_reviews: number
    _all: number
  }


  export type PlacesAvgAggregateInputType = {
    latitude?: true
    longitude?: true
    average_rating?: true
    total_reviews?: true
    heat_score?: true
    google_average_rating?: true
    google_total_reviews?: true
  }

  export type PlacesSumAggregateInputType = {
    latitude?: true
    longitude?: true
    average_rating?: true
    total_reviews?: true
    heat_score?: true
    google_average_rating?: true
    google_total_reviews?: true
  }

  export type PlacesMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    category?: true
    latitude?: true
    longitude?: true
    address?: true
    city?: true
    average_rating?: true
    total_reviews?: true
    heat_score?: true
    created_at?: true
    updated_at?: true
    googleMapsUri?: true
    websiteUri?: true
    nationalPhoneNumber?: true
    internationalPhoneNumber?: true
    take_out?: true
    delivery?: true
    dine_in?: true
    reservable?: true
    serves_breakfast?: true
    serves_lunch?: true
    serves_dinner?: true
    serves_beer?: true
    serves_wine?: true
    serves_brunch?: true
    serves_vegetarian_food?: true
    outdoor_seating?: true
    live_music?: true
    menu_for_children?: true
    serves_cocktails?: true
    serves_dessert?: true
    serves_coffee?: true
    good_for_children?: true
    restroom?: true
    good_for_groups?: true
    good_for_watching_sports?: true
    priceLevel?: true
    timeZone?: true
    acceptsCreditCards?: true
    acceptsDebitCards?: true
    acceptsCashOnly?: true
    acceptsNfc?: true
    freeParkingLot?: true
    freeStreetParking?: true
    paidParkingLot?: true
    valetParking?: true
    wheelchairAccessibleParking?: true
    wheelchairAccessibleEntrance?: true
    wheelchairAccessibleRestroom?: true
    wheelchairAccessibleSeating?: true
    directionsUri?: true
    placeUri?: true
    writeAReviewUri?: true
    reviewsUri?: true
    photosUri?: true
    google_average_rating?: true
    google_total_reviews?: true
  }

  export type PlacesMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    category?: true
    latitude?: true
    longitude?: true
    address?: true
    city?: true
    average_rating?: true
    total_reviews?: true
    heat_score?: true
    created_at?: true
    updated_at?: true
    googleMapsUri?: true
    websiteUri?: true
    nationalPhoneNumber?: true
    internationalPhoneNumber?: true
    take_out?: true
    delivery?: true
    dine_in?: true
    reservable?: true
    serves_breakfast?: true
    serves_lunch?: true
    serves_dinner?: true
    serves_beer?: true
    serves_wine?: true
    serves_brunch?: true
    serves_vegetarian_food?: true
    outdoor_seating?: true
    live_music?: true
    menu_for_children?: true
    serves_cocktails?: true
    serves_dessert?: true
    serves_coffee?: true
    good_for_children?: true
    restroom?: true
    good_for_groups?: true
    good_for_watching_sports?: true
    priceLevel?: true
    timeZone?: true
    acceptsCreditCards?: true
    acceptsDebitCards?: true
    acceptsCashOnly?: true
    acceptsNfc?: true
    freeParkingLot?: true
    freeStreetParking?: true
    paidParkingLot?: true
    valetParking?: true
    wheelchairAccessibleParking?: true
    wheelchairAccessibleEntrance?: true
    wheelchairAccessibleRestroom?: true
    wheelchairAccessibleSeating?: true
    directionsUri?: true
    placeUri?: true
    writeAReviewUri?: true
    reviewsUri?: true
    photosUri?: true
    google_average_rating?: true
    google_total_reviews?: true
  }

  export type PlacesCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    category?: true
    latitude?: true
    longitude?: true
    address?: true
    city?: true
    images?: true
    tags?: true
    opening_hours?: true
    average_rating?: true
    total_reviews?: true
    heat_score?: true
    created_at?: true
    updated_at?: true
    googleMapsUri?: true
    websiteUri?: true
    nationalPhoneNumber?: true
    internationalPhoneNumber?: true
    take_out?: true
    delivery?: true
    dine_in?: true
    reservable?: true
    serves_breakfast?: true
    serves_lunch?: true
    serves_dinner?: true
    serves_beer?: true
    serves_wine?: true
    serves_brunch?: true
    serves_vegetarian_food?: true
    outdoor_seating?: true
    live_music?: true
    menu_for_children?: true
    serves_cocktails?: true
    serves_dessert?: true
    serves_coffee?: true
    good_for_children?: true
    restroom?: true
    good_for_groups?: true
    good_for_watching_sports?: true
    priceLevel?: true
    timeZone?: true
    acceptsCreditCards?: true
    acceptsDebitCards?: true
    acceptsCashOnly?: true
    acceptsNfc?: true
    freeParkingLot?: true
    freeStreetParking?: true
    paidParkingLot?: true
    valetParking?: true
    wheelchairAccessibleParking?: true
    wheelchairAccessibleEntrance?: true
    wheelchairAccessibleRestroom?: true
    wheelchairAccessibleSeating?: true
    directionsUri?: true
    placeUri?: true
    writeAReviewUri?: true
    reviewsUri?: true
    photosUri?: true
    google_average_rating?: true
    google_total_reviews?: true
    _all?: true
  }

  export type PlacesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which places to aggregate.
     */
    where?: placesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of places to fetch.
     */
    orderBy?: placesOrderByWithRelationInput | placesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: placesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` places from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` places.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned places
    **/
    _count?: true | PlacesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlacesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlacesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlacesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlacesMaxAggregateInputType
  }

  export type GetPlacesAggregateType<T extends PlacesAggregateArgs> = {
        [P in keyof T & keyof AggregatePlaces]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlaces[P]>
      : GetScalarType<T[P], AggregatePlaces[P]>
  }




  export type placesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: placesWhereInput
    orderBy?: placesOrderByWithAggregationInput | placesOrderByWithAggregationInput[]
    by: PlacesScalarFieldEnum[] | PlacesScalarFieldEnum
    having?: placesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlacesCountAggregateInputType | true
    _avg?: PlacesAvgAggregateInputType
    _sum?: PlacesSumAggregateInputType
    _min?: PlacesMinAggregateInputType
    _max?: PlacesMaxAggregateInputType
  }

  export type PlacesGroupByOutputType = {
    id: string
    name: string
    description: string
    category: string
    latitude: number
    longitude: number
    address: string
    city: string
    images: string[]
    tags: string[]
    opening_hours: JsonValue | null
    average_rating: number
    total_reviews: number
    heat_score: number
    created_at: Date
    updated_at: Date
    googleMapsUri: string
    websiteUri: string
    nationalPhoneNumber: string | null
    internationalPhoneNumber: string | null
    take_out: boolean
    delivery: boolean
    dine_in: boolean
    reservable: boolean
    serves_breakfast: boolean
    serves_lunch: boolean
    serves_dinner: boolean
    serves_beer: boolean
    serves_wine: boolean
    serves_brunch: boolean
    serves_vegetarian_food: boolean
    outdoor_seating: boolean
    live_music: boolean
    menu_for_children: boolean
    serves_cocktails: boolean
    serves_dessert: boolean
    serves_coffee: boolean
    good_for_children: boolean
    restroom: boolean
    good_for_groups: boolean
    good_for_watching_sports: boolean
    priceLevel: string
    timeZone: string
    acceptsCreditCards: boolean
    acceptsDebitCards: boolean
    acceptsCashOnly: boolean
    acceptsNfc: boolean
    freeParkingLot: boolean
    freeStreetParking: boolean
    paidParkingLot: boolean
    valetParking: boolean
    wheelchairAccessibleParking: boolean
    wheelchairAccessibleEntrance: boolean
    wheelchairAccessibleRestroom: boolean
    wheelchairAccessibleSeating: boolean
    directionsUri: string
    placeUri: string
    writeAReviewUri: string
    reviewsUri: string
    photosUri: string
    google_average_rating: number
    google_total_reviews: number
    _count: PlacesCountAggregateOutputType | null
    _avg: PlacesAvgAggregateOutputType | null
    _sum: PlacesSumAggregateOutputType | null
    _min: PlacesMinAggregateOutputType | null
    _max: PlacesMaxAggregateOutputType | null
  }

  type GetPlacesGroupByPayload<T extends placesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlacesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlacesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlacesGroupByOutputType[P]>
            : GetScalarType<T[P], PlacesGroupByOutputType[P]>
        }
      >
    >


  export type placesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    category?: boolean
    latitude?: boolean
    longitude?: boolean
    address?: boolean
    city?: boolean
    images?: boolean
    tags?: boolean
    opening_hours?: boolean
    average_rating?: boolean
    total_reviews?: boolean
    heat_score?: boolean
    created_at?: boolean
    updated_at?: boolean
    googleMapsUri?: boolean
    websiteUri?: boolean
    nationalPhoneNumber?: boolean
    internationalPhoneNumber?: boolean
    take_out?: boolean
    delivery?: boolean
    dine_in?: boolean
    reservable?: boolean
    serves_breakfast?: boolean
    serves_lunch?: boolean
    serves_dinner?: boolean
    serves_beer?: boolean
    serves_wine?: boolean
    serves_brunch?: boolean
    serves_vegetarian_food?: boolean
    outdoor_seating?: boolean
    live_music?: boolean
    menu_for_children?: boolean
    serves_cocktails?: boolean
    serves_dessert?: boolean
    serves_coffee?: boolean
    good_for_children?: boolean
    restroom?: boolean
    good_for_groups?: boolean
    good_for_watching_sports?: boolean
    priceLevel?: boolean
    timeZone?: boolean
    acceptsCreditCards?: boolean
    acceptsDebitCards?: boolean
    acceptsCashOnly?: boolean
    acceptsNfc?: boolean
    freeParkingLot?: boolean
    freeStreetParking?: boolean
    paidParkingLot?: boolean
    valetParking?: boolean
    wheelchairAccessibleParking?: boolean
    wheelchairAccessibleEntrance?: boolean
    wheelchairAccessibleRestroom?: boolean
    wheelchairAccessibleSeating?: boolean
    directionsUri?: boolean
    placeUri?: boolean
    writeAReviewUri?: boolean
    reviewsUri?: boolean
    photosUri?: boolean
    google_average_rating?: boolean
    google_total_reviews?: boolean
    reviews?: boolean | places$reviewsArgs<ExtArgs>
    _count?: boolean | PlacesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["places"]>

  export type placesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    category?: boolean
    latitude?: boolean
    longitude?: boolean
    address?: boolean
    city?: boolean
    images?: boolean
    tags?: boolean
    opening_hours?: boolean
    average_rating?: boolean
    total_reviews?: boolean
    heat_score?: boolean
    created_at?: boolean
    updated_at?: boolean
    googleMapsUri?: boolean
    websiteUri?: boolean
    nationalPhoneNumber?: boolean
    internationalPhoneNumber?: boolean
    take_out?: boolean
    delivery?: boolean
    dine_in?: boolean
    reservable?: boolean
    serves_breakfast?: boolean
    serves_lunch?: boolean
    serves_dinner?: boolean
    serves_beer?: boolean
    serves_wine?: boolean
    serves_brunch?: boolean
    serves_vegetarian_food?: boolean
    outdoor_seating?: boolean
    live_music?: boolean
    menu_for_children?: boolean
    serves_cocktails?: boolean
    serves_dessert?: boolean
    serves_coffee?: boolean
    good_for_children?: boolean
    restroom?: boolean
    good_for_groups?: boolean
    good_for_watching_sports?: boolean
    priceLevel?: boolean
    timeZone?: boolean
    acceptsCreditCards?: boolean
    acceptsDebitCards?: boolean
    acceptsCashOnly?: boolean
    acceptsNfc?: boolean
    freeParkingLot?: boolean
    freeStreetParking?: boolean
    paidParkingLot?: boolean
    valetParking?: boolean
    wheelchairAccessibleParking?: boolean
    wheelchairAccessibleEntrance?: boolean
    wheelchairAccessibleRestroom?: boolean
    wheelchairAccessibleSeating?: boolean
    directionsUri?: boolean
    placeUri?: boolean
    writeAReviewUri?: boolean
    reviewsUri?: boolean
    photosUri?: boolean
    google_average_rating?: boolean
    google_total_reviews?: boolean
  }, ExtArgs["result"]["places"]>

  export type placesSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    category?: boolean
    latitude?: boolean
    longitude?: boolean
    address?: boolean
    city?: boolean
    images?: boolean
    tags?: boolean
    opening_hours?: boolean
    average_rating?: boolean
    total_reviews?: boolean
    heat_score?: boolean
    created_at?: boolean
    updated_at?: boolean
    googleMapsUri?: boolean
    websiteUri?: boolean
    nationalPhoneNumber?: boolean
    internationalPhoneNumber?: boolean
    take_out?: boolean
    delivery?: boolean
    dine_in?: boolean
    reservable?: boolean
    serves_breakfast?: boolean
    serves_lunch?: boolean
    serves_dinner?: boolean
    serves_beer?: boolean
    serves_wine?: boolean
    serves_brunch?: boolean
    serves_vegetarian_food?: boolean
    outdoor_seating?: boolean
    live_music?: boolean
    menu_for_children?: boolean
    serves_cocktails?: boolean
    serves_dessert?: boolean
    serves_coffee?: boolean
    good_for_children?: boolean
    restroom?: boolean
    good_for_groups?: boolean
    good_for_watching_sports?: boolean
    priceLevel?: boolean
    timeZone?: boolean
    acceptsCreditCards?: boolean
    acceptsDebitCards?: boolean
    acceptsCashOnly?: boolean
    acceptsNfc?: boolean
    freeParkingLot?: boolean
    freeStreetParking?: boolean
    paidParkingLot?: boolean
    valetParking?: boolean
    wheelchairAccessibleParking?: boolean
    wheelchairAccessibleEntrance?: boolean
    wheelchairAccessibleRestroom?: boolean
    wheelchairAccessibleSeating?: boolean
    directionsUri?: boolean
    placeUri?: boolean
    writeAReviewUri?: boolean
    reviewsUri?: boolean
    photosUri?: boolean
    google_average_rating?: boolean
    google_total_reviews?: boolean
  }

  export type placesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reviews?: boolean | places$reviewsArgs<ExtArgs>
    _count?: boolean | PlacesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type placesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $placesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "places"
    objects: {
      reviews: Prisma.$reviewsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string
      category: string
      latitude: number
      longitude: number
      address: string
      city: string
      images: string[]
      tags: string[]
      opening_hours: Prisma.JsonValue | null
      average_rating: number
      total_reviews: number
      heat_score: number
      created_at: Date
      updated_at: Date
      googleMapsUri: string
      websiteUri: string
      nationalPhoneNumber: string | null
      internationalPhoneNumber: string | null
      take_out: boolean
      delivery: boolean
      dine_in: boolean
      reservable: boolean
      serves_breakfast: boolean
      serves_lunch: boolean
      serves_dinner: boolean
      serves_beer: boolean
      serves_wine: boolean
      serves_brunch: boolean
      serves_vegetarian_food: boolean
      outdoor_seating: boolean
      live_music: boolean
      menu_for_children: boolean
      serves_cocktails: boolean
      serves_dessert: boolean
      serves_coffee: boolean
      good_for_children: boolean
      restroom: boolean
      good_for_groups: boolean
      good_for_watching_sports: boolean
      priceLevel: string
      timeZone: string
      acceptsCreditCards: boolean
      acceptsDebitCards: boolean
      acceptsCashOnly: boolean
      acceptsNfc: boolean
      freeParkingLot: boolean
      freeStreetParking: boolean
      paidParkingLot: boolean
      valetParking: boolean
      wheelchairAccessibleParking: boolean
      wheelchairAccessibleEntrance: boolean
      wheelchairAccessibleRestroom: boolean
      wheelchairAccessibleSeating: boolean
      directionsUri: string
      placeUri: string
      writeAReviewUri: string
      reviewsUri: string
      photosUri: string
      google_average_rating: number
      google_total_reviews: number
    }, ExtArgs["result"]["places"]>
    composites: {}
  }

  type placesGetPayload<S extends boolean | null | undefined | placesDefaultArgs> = $Result.GetResult<Prisma.$placesPayload, S>

  type placesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<placesFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PlacesCountAggregateInputType | true
    }

  export interface placesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['places'], meta: { name: 'places' } }
    /**
     * Find zero or one Places that matches the filter.
     * @param {placesFindUniqueArgs} args - Arguments to find a Places
     * @example
     * // Get one Places
     * const places = await prisma.places.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends placesFindUniqueArgs>(args: SelectSubset<T, placesFindUniqueArgs<ExtArgs>>): Prisma__placesClient<$Result.GetResult<Prisma.$placesPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Places that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {placesFindUniqueOrThrowArgs} args - Arguments to find a Places
     * @example
     * // Get one Places
     * const places = await prisma.places.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends placesFindUniqueOrThrowArgs>(args: SelectSubset<T, placesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__placesClient<$Result.GetResult<Prisma.$placesPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Places that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {placesFindFirstArgs} args - Arguments to find a Places
     * @example
     * // Get one Places
     * const places = await prisma.places.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends placesFindFirstArgs>(args?: SelectSubset<T, placesFindFirstArgs<ExtArgs>>): Prisma__placesClient<$Result.GetResult<Prisma.$placesPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Places that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {placesFindFirstOrThrowArgs} args - Arguments to find a Places
     * @example
     * // Get one Places
     * const places = await prisma.places.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends placesFindFirstOrThrowArgs>(args?: SelectSubset<T, placesFindFirstOrThrowArgs<ExtArgs>>): Prisma__placesClient<$Result.GetResult<Prisma.$placesPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Places that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {placesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Places
     * const places = await prisma.places.findMany()
     * 
     * // Get first 10 Places
     * const places = await prisma.places.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const placesWithIdOnly = await prisma.places.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends placesFindManyArgs>(args?: SelectSubset<T, placesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$placesPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Places.
     * @param {placesCreateArgs} args - Arguments to create a Places.
     * @example
     * // Create one Places
     * const Places = await prisma.places.create({
     *   data: {
     *     // ... data to create a Places
     *   }
     * })
     * 
     */
    create<T extends placesCreateArgs>(args: SelectSubset<T, placesCreateArgs<ExtArgs>>): Prisma__placesClient<$Result.GetResult<Prisma.$placesPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Places.
     * @param {placesCreateManyArgs} args - Arguments to create many Places.
     * @example
     * // Create many Places
     * const places = await prisma.places.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends placesCreateManyArgs>(args?: SelectSubset<T, placesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Places and returns the data saved in the database.
     * @param {placesCreateManyAndReturnArgs} args - Arguments to create many Places.
     * @example
     * // Create many Places
     * const places = await prisma.places.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Places and only return the `id`
     * const placesWithIdOnly = await prisma.places.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends placesCreateManyAndReturnArgs>(args?: SelectSubset<T, placesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$placesPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Places.
     * @param {placesDeleteArgs} args - Arguments to delete one Places.
     * @example
     * // Delete one Places
     * const Places = await prisma.places.delete({
     *   where: {
     *     // ... filter to delete one Places
     *   }
     * })
     * 
     */
    delete<T extends placesDeleteArgs>(args: SelectSubset<T, placesDeleteArgs<ExtArgs>>): Prisma__placesClient<$Result.GetResult<Prisma.$placesPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Places.
     * @param {placesUpdateArgs} args - Arguments to update one Places.
     * @example
     * // Update one Places
     * const places = await prisma.places.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends placesUpdateArgs>(args: SelectSubset<T, placesUpdateArgs<ExtArgs>>): Prisma__placesClient<$Result.GetResult<Prisma.$placesPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Places.
     * @param {placesDeleteManyArgs} args - Arguments to filter Places to delete.
     * @example
     * // Delete a few Places
     * const { count } = await prisma.places.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends placesDeleteManyArgs>(args?: SelectSubset<T, placesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Places.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {placesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Places
     * const places = await prisma.places.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends placesUpdateManyArgs>(args: SelectSubset<T, placesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Places.
     * @param {placesUpsertArgs} args - Arguments to update or create a Places.
     * @example
     * // Update or create a Places
     * const places = await prisma.places.upsert({
     *   create: {
     *     // ... data to create a Places
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Places we want to update
     *   }
     * })
     */
    upsert<T extends placesUpsertArgs>(args: SelectSubset<T, placesUpsertArgs<ExtArgs>>): Prisma__placesClient<$Result.GetResult<Prisma.$placesPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Places.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {placesCountArgs} args - Arguments to filter Places to count.
     * @example
     * // Count the number of Places
     * const count = await prisma.places.count({
     *   where: {
     *     // ... the filter for the Places we want to count
     *   }
     * })
    **/
    count<T extends placesCountArgs>(
      args?: Subset<T, placesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlacesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Places.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlacesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlacesAggregateArgs>(args: Subset<T, PlacesAggregateArgs>): Prisma.PrismaPromise<GetPlacesAggregateType<T>>

    /**
     * Group by Places.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {placesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends placesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: placesGroupByArgs['orderBy'] }
        : { orderBy?: placesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, placesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlacesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the places model
   */
  readonly fields: placesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for places.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__placesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    reviews<T extends places$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, places$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the places model
   */ 
  interface placesFieldRefs {
    readonly id: FieldRef<"places", 'String'>
    readonly name: FieldRef<"places", 'String'>
    readonly description: FieldRef<"places", 'String'>
    readonly category: FieldRef<"places", 'String'>
    readonly latitude: FieldRef<"places", 'Float'>
    readonly longitude: FieldRef<"places", 'Float'>
    readonly address: FieldRef<"places", 'String'>
    readonly city: FieldRef<"places", 'String'>
    readonly images: FieldRef<"places", 'String[]'>
    readonly tags: FieldRef<"places", 'String[]'>
    readonly opening_hours: FieldRef<"places", 'Json'>
    readonly average_rating: FieldRef<"places", 'Float'>
    readonly total_reviews: FieldRef<"places", 'Int'>
    readonly heat_score: FieldRef<"places", 'Float'>
    readonly created_at: FieldRef<"places", 'DateTime'>
    readonly updated_at: FieldRef<"places", 'DateTime'>
    readonly googleMapsUri: FieldRef<"places", 'String'>
    readonly websiteUri: FieldRef<"places", 'String'>
    readonly nationalPhoneNumber: FieldRef<"places", 'String'>
    readonly internationalPhoneNumber: FieldRef<"places", 'String'>
    readonly take_out: FieldRef<"places", 'Boolean'>
    readonly delivery: FieldRef<"places", 'Boolean'>
    readonly dine_in: FieldRef<"places", 'Boolean'>
    readonly reservable: FieldRef<"places", 'Boolean'>
    readonly serves_breakfast: FieldRef<"places", 'Boolean'>
    readonly serves_lunch: FieldRef<"places", 'Boolean'>
    readonly serves_dinner: FieldRef<"places", 'Boolean'>
    readonly serves_beer: FieldRef<"places", 'Boolean'>
    readonly serves_wine: FieldRef<"places", 'Boolean'>
    readonly serves_brunch: FieldRef<"places", 'Boolean'>
    readonly serves_vegetarian_food: FieldRef<"places", 'Boolean'>
    readonly outdoor_seating: FieldRef<"places", 'Boolean'>
    readonly live_music: FieldRef<"places", 'Boolean'>
    readonly menu_for_children: FieldRef<"places", 'Boolean'>
    readonly serves_cocktails: FieldRef<"places", 'Boolean'>
    readonly serves_dessert: FieldRef<"places", 'Boolean'>
    readonly serves_coffee: FieldRef<"places", 'Boolean'>
    readonly good_for_children: FieldRef<"places", 'Boolean'>
    readonly restroom: FieldRef<"places", 'Boolean'>
    readonly good_for_groups: FieldRef<"places", 'Boolean'>
    readonly good_for_watching_sports: FieldRef<"places", 'Boolean'>
    readonly priceLevel: FieldRef<"places", 'String'>
    readonly timeZone: FieldRef<"places", 'String'>
    readonly acceptsCreditCards: FieldRef<"places", 'Boolean'>
    readonly acceptsDebitCards: FieldRef<"places", 'Boolean'>
    readonly acceptsCashOnly: FieldRef<"places", 'Boolean'>
    readonly acceptsNfc: FieldRef<"places", 'Boolean'>
    readonly freeParkingLot: FieldRef<"places", 'Boolean'>
    readonly freeStreetParking: FieldRef<"places", 'Boolean'>
    readonly paidParkingLot: FieldRef<"places", 'Boolean'>
    readonly valetParking: FieldRef<"places", 'Boolean'>
    readonly wheelchairAccessibleParking: FieldRef<"places", 'Boolean'>
    readonly wheelchairAccessibleEntrance: FieldRef<"places", 'Boolean'>
    readonly wheelchairAccessibleRestroom: FieldRef<"places", 'Boolean'>
    readonly wheelchairAccessibleSeating: FieldRef<"places", 'Boolean'>
    readonly directionsUri: FieldRef<"places", 'String'>
    readonly placeUri: FieldRef<"places", 'String'>
    readonly writeAReviewUri: FieldRef<"places", 'String'>
    readonly reviewsUri: FieldRef<"places", 'String'>
    readonly photosUri: FieldRef<"places", 'String'>
    readonly google_average_rating: FieldRef<"places", 'Float'>
    readonly google_total_reviews: FieldRef<"places", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * places findUnique
   */
  export type placesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the places
     */
    select?: placesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: placesInclude<ExtArgs> | null
    /**
     * Filter, which places to fetch.
     */
    where: placesWhereUniqueInput
  }

  /**
   * places findUniqueOrThrow
   */
  export type placesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the places
     */
    select?: placesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: placesInclude<ExtArgs> | null
    /**
     * Filter, which places to fetch.
     */
    where: placesWhereUniqueInput
  }

  /**
   * places findFirst
   */
  export type placesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the places
     */
    select?: placesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: placesInclude<ExtArgs> | null
    /**
     * Filter, which places to fetch.
     */
    where?: placesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of places to fetch.
     */
    orderBy?: placesOrderByWithRelationInput | placesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for places.
     */
    cursor?: placesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` places from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` places.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of places.
     */
    distinct?: PlacesScalarFieldEnum | PlacesScalarFieldEnum[]
  }

  /**
   * places findFirstOrThrow
   */
  export type placesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the places
     */
    select?: placesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: placesInclude<ExtArgs> | null
    /**
     * Filter, which places to fetch.
     */
    where?: placesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of places to fetch.
     */
    orderBy?: placesOrderByWithRelationInput | placesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for places.
     */
    cursor?: placesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` places from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` places.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of places.
     */
    distinct?: PlacesScalarFieldEnum | PlacesScalarFieldEnum[]
  }

  /**
   * places findMany
   */
  export type placesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the places
     */
    select?: placesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: placesInclude<ExtArgs> | null
    /**
     * Filter, which places to fetch.
     */
    where?: placesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of places to fetch.
     */
    orderBy?: placesOrderByWithRelationInput | placesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing places.
     */
    cursor?: placesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` places from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` places.
     */
    skip?: number
    distinct?: PlacesScalarFieldEnum | PlacesScalarFieldEnum[]
  }

  /**
   * places create
   */
  export type placesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the places
     */
    select?: placesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: placesInclude<ExtArgs> | null
    /**
     * The data needed to create a places.
     */
    data: XOR<placesCreateInput, placesUncheckedCreateInput>
  }

  /**
   * places createMany
   */
  export type placesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many places.
     */
    data: placesCreateManyInput | placesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * places createManyAndReturn
   */
  export type placesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the places
     */
    select?: placesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many places.
     */
    data: placesCreateManyInput | placesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * places update
   */
  export type placesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the places
     */
    select?: placesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: placesInclude<ExtArgs> | null
    /**
     * The data needed to update a places.
     */
    data: XOR<placesUpdateInput, placesUncheckedUpdateInput>
    /**
     * Choose, which places to update.
     */
    where: placesWhereUniqueInput
  }

  /**
   * places updateMany
   */
  export type placesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update places.
     */
    data: XOR<placesUpdateManyMutationInput, placesUncheckedUpdateManyInput>
    /**
     * Filter which places to update
     */
    where?: placesWhereInput
  }

  /**
   * places upsert
   */
  export type placesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the places
     */
    select?: placesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: placesInclude<ExtArgs> | null
    /**
     * The filter to search for the places to update in case it exists.
     */
    where: placesWhereUniqueInput
    /**
     * In case the places found by the `where` argument doesn't exist, create a new places with this data.
     */
    create: XOR<placesCreateInput, placesUncheckedCreateInput>
    /**
     * In case the places was found with the provided `where` argument, update it with this data.
     */
    update: XOR<placesUpdateInput, placesUncheckedUpdateInput>
  }

  /**
   * places delete
   */
  export type placesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the places
     */
    select?: placesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: placesInclude<ExtArgs> | null
    /**
     * Filter which places to delete.
     */
    where: placesWhereUniqueInput
  }

  /**
   * places deleteMany
   */
  export type placesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which places to delete
     */
    where?: placesWhereInput
  }

  /**
   * places.reviews
   */
  export type places$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    where?: reviewsWhereInput
    orderBy?: reviewsOrderByWithRelationInput | reviewsOrderByWithRelationInput[]
    cursor?: reviewsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewsScalarFieldEnum | ReviewsScalarFieldEnum[]
  }

  /**
   * places without action
   */
  export type placesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the places
     */
    select?: placesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: placesInclude<ExtArgs> | null
  }


  /**
   * Model reviews
   */

  export type AggregateReviews = {
    _count: ReviewsCountAggregateOutputType | null
    _avg: ReviewsAvgAggregateOutputType | null
    _sum: ReviewsSumAggregateOutputType | null
    _min: ReviewsMinAggregateOutputType | null
    _max: ReviewsMaxAggregateOutputType | null
  }

  export type ReviewsAvgAggregateOutputType = {
    rating: number | null
  }

  export type ReviewsSumAggregateOutputType = {
    rating: number | null
  }

  export type ReviewsMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    place_id: string | null
    rating: number | null
    comment: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ReviewsMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    place_id: string | null
    rating: number | null
    comment: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ReviewsCountAggregateOutputType = {
    id: number
    user_id: number
    place_id: number
    rating: number
    comment: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ReviewsAvgAggregateInputType = {
    rating?: true
  }

  export type ReviewsSumAggregateInputType = {
    rating?: true
  }

  export type ReviewsMinAggregateInputType = {
    id?: true
    user_id?: true
    place_id?: true
    rating?: true
    comment?: true
    created_at?: true
    updated_at?: true
  }

  export type ReviewsMaxAggregateInputType = {
    id?: true
    user_id?: true
    place_id?: true
    rating?: true
    comment?: true
    created_at?: true
    updated_at?: true
  }

  export type ReviewsCountAggregateInputType = {
    id?: true
    user_id?: true
    place_id?: true
    rating?: true
    comment?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ReviewsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which reviews to aggregate.
     */
    where?: reviewsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reviews to fetch.
     */
    orderBy?: reviewsOrderByWithRelationInput | reviewsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: reviewsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned reviews
    **/
    _count?: true | ReviewsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReviewsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReviewsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReviewsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReviewsMaxAggregateInputType
  }

  export type GetReviewsAggregateType<T extends ReviewsAggregateArgs> = {
        [P in keyof T & keyof AggregateReviews]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReviews[P]>
      : GetScalarType<T[P], AggregateReviews[P]>
  }




  export type reviewsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: reviewsWhereInput
    orderBy?: reviewsOrderByWithAggregationInput | reviewsOrderByWithAggregationInput[]
    by: ReviewsScalarFieldEnum[] | ReviewsScalarFieldEnum
    having?: reviewsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReviewsCountAggregateInputType | true
    _avg?: ReviewsAvgAggregateInputType
    _sum?: ReviewsSumAggregateInputType
    _min?: ReviewsMinAggregateInputType
    _max?: ReviewsMaxAggregateInputType
  }

  export type ReviewsGroupByOutputType = {
    id: string
    user_id: string
    place_id: string
    rating: number
    comment: string | null
    created_at: Date
    updated_at: Date
    _count: ReviewsCountAggregateOutputType | null
    _avg: ReviewsAvgAggregateOutputType | null
    _sum: ReviewsSumAggregateOutputType | null
    _min: ReviewsMinAggregateOutputType | null
    _max: ReviewsMaxAggregateOutputType | null
  }

  type GetReviewsGroupByPayload<T extends reviewsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReviewsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReviewsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReviewsGroupByOutputType[P]>
            : GetScalarType<T[P], ReviewsGroupByOutputType[P]>
        }
      >
    >


  export type reviewsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    place_id?: boolean
    rating?: boolean
    comment?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
    place?: boolean | placesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reviews"]>

  export type reviewsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    place_id?: boolean
    rating?: boolean
    comment?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
    place?: boolean | placesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reviews"]>

  export type reviewsSelectScalar = {
    id?: boolean
    user_id?: boolean
    place_id?: boolean
    rating?: boolean
    comment?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type reviewsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
    place?: boolean | placesDefaultArgs<ExtArgs>
  }
  export type reviewsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
    place?: boolean | placesDefaultArgs<ExtArgs>
  }

  export type $reviewsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "reviews"
    objects: {
      user: Prisma.$usersPayload<ExtArgs>
      place: Prisma.$placesPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      place_id: string
      rating: number
      comment: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["reviews"]>
    composites: {}
  }

  type reviewsGetPayload<S extends boolean | null | undefined | reviewsDefaultArgs> = $Result.GetResult<Prisma.$reviewsPayload, S>

  type reviewsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<reviewsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ReviewsCountAggregateInputType | true
    }

  export interface reviewsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['reviews'], meta: { name: 'reviews' } }
    /**
     * Find zero or one Reviews that matches the filter.
     * @param {reviewsFindUniqueArgs} args - Arguments to find a Reviews
     * @example
     * // Get one Reviews
     * const reviews = await prisma.reviews.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends reviewsFindUniqueArgs>(args: SelectSubset<T, reviewsFindUniqueArgs<ExtArgs>>): Prisma__reviewsClient<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Reviews that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {reviewsFindUniqueOrThrowArgs} args - Arguments to find a Reviews
     * @example
     * // Get one Reviews
     * const reviews = await prisma.reviews.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends reviewsFindUniqueOrThrowArgs>(args: SelectSubset<T, reviewsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__reviewsClient<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Reviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reviewsFindFirstArgs} args - Arguments to find a Reviews
     * @example
     * // Get one Reviews
     * const reviews = await prisma.reviews.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends reviewsFindFirstArgs>(args?: SelectSubset<T, reviewsFindFirstArgs<ExtArgs>>): Prisma__reviewsClient<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Reviews that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reviewsFindFirstOrThrowArgs} args - Arguments to find a Reviews
     * @example
     * // Get one Reviews
     * const reviews = await prisma.reviews.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends reviewsFindFirstOrThrowArgs>(args?: SelectSubset<T, reviewsFindFirstOrThrowArgs<ExtArgs>>): Prisma__reviewsClient<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Reviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reviewsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reviews
     * const reviews = await prisma.reviews.findMany()
     * 
     * // Get first 10 Reviews
     * const reviews = await prisma.reviews.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reviewsWithIdOnly = await prisma.reviews.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends reviewsFindManyArgs>(args?: SelectSubset<T, reviewsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Reviews.
     * @param {reviewsCreateArgs} args - Arguments to create a Reviews.
     * @example
     * // Create one Reviews
     * const Reviews = await prisma.reviews.create({
     *   data: {
     *     // ... data to create a Reviews
     *   }
     * })
     * 
     */
    create<T extends reviewsCreateArgs>(args: SelectSubset<T, reviewsCreateArgs<ExtArgs>>): Prisma__reviewsClient<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Reviews.
     * @param {reviewsCreateManyArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const reviews = await prisma.reviews.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends reviewsCreateManyArgs>(args?: SelectSubset<T, reviewsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reviews and returns the data saved in the database.
     * @param {reviewsCreateManyAndReturnArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const reviews = await prisma.reviews.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reviews and only return the `id`
     * const reviewsWithIdOnly = await prisma.reviews.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends reviewsCreateManyAndReturnArgs>(args?: SelectSubset<T, reviewsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Reviews.
     * @param {reviewsDeleteArgs} args - Arguments to delete one Reviews.
     * @example
     * // Delete one Reviews
     * const Reviews = await prisma.reviews.delete({
     *   where: {
     *     // ... filter to delete one Reviews
     *   }
     * })
     * 
     */
    delete<T extends reviewsDeleteArgs>(args: SelectSubset<T, reviewsDeleteArgs<ExtArgs>>): Prisma__reviewsClient<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Reviews.
     * @param {reviewsUpdateArgs} args - Arguments to update one Reviews.
     * @example
     * // Update one Reviews
     * const reviews = await prisma.reviews.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends reviewsUpdateArgs>(args: SelectSubset<T, reviewsUpdateArgs<ExtArgs>>): Prisma__reviewsClient<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Reviews.
     * @param {reviewsDeleteManyArgs} args - Arguments to filter Reviews to delete.
     * @example
     * // Delete a few Reviews
     * const { count } = await prisma.reviews.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends reviewsDeleteManyArgs>(args?: SelectSubset<T, reviewsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reviewsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reviews
     * const reviews = await prisma.reviews.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends reviewsUpdateManyArgs>(args: SelectSubset<T, reviewsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Reviews.
     * @param {reviewsUpsertArgs} args - Arguments to update or create a Reviews.
     * @example
     * // Update or create a Reviews
     * const reviews = await prisma.reviews.upsert({
     *   create: {
     *     // ... data to create a Reviews
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Reviews we want to update
     *   }
     * })
     */
    upsert<T extends reviewsUpsertArgs>(args: SelectSubset<T, reviewsUpsertArgs<ExtArgs>>): Prisma__reviewsClient<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reviewsCountArgs} args - Arguments to filter Reviews to count.
     * @example
     * // Count the number of Reviews
     * const count = await prisma.reviews.count({
     *   where: {
     *     // ... the filter for the Reviews we want to count
     *   }
     * })
    **/
    count<T extends reviewsCountArgs>(
      args?: Subset<T, reviewsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReviewsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReviewsAggregateArgs>(args: Subset<T, ReviewsAggregateArgs>): Prisma.PrismaPromise<GetReviewsAggregateType<T>>

    /**
     * Group by Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reviewsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends reviewsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: reviewsGroupByArgs['orderBy'] }
        : { orderBy?: reviewsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, reviewsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the reviews model
   */
  readonly fields: reviewsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for reviews.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__reviewsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    place<T extends placesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, placesDefaultArgs<ExtArgs>>): Prisma__placesClient<$Result.GetResult<Prisma.$placesPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the reviews model
   */ 
  interface reviewsFieldRefs {
    readonly id: FieldRef<"reviews", 'String'>
    readonly user_id: FieldRef<"reviews", 'String'>
    readonly place_id: FieldRef<"reviews", 'String'>
    readonly rating: FieldRef<"reviews", 'Int'>
    readonly comment: FieldRef<"reviews", 'String'>
    readonly created_at: FieldRef<"reviews", 'DateTime'>
    readonly updated_at: FieldRef<"reviews", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * reviews findUnique
   */
  export type reviewsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    /**
     * Filter, which reviews to fetch.
     */
    where: reviewsWhereUniqueInput
  }

  /**
   * reviews findUniqueOrThrow
   */
  export type reviewsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    /**
     * Filter, which reviews to fetch.
     */
    where: reviewsWhereUniqueInput
  }

  /**
   * reviews findFirst
   */
  export type reviewsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    /**
     * Filter, which reviews to fetch.
     */
    where?: reviewsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reviews to fetch.
     */
    orderBy?: reviewsOrderByWithRelationInput | reviewsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for reviews.
     */
    cursor?: reviewsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of reviews.
     */
    distinct?: ReviewsScalarFieldEnum | ReviewsScalarFieldEnum[]
  }

  /**
   * reviews findFirstOrThrow
   */
  export type reviewsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    /**
     * Filter, which reviews to fetch.
     */
    where?: reviewsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reviews to fetch.
     */
    orderBy?: reviewsOrderByWithRelationInput | reviewsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for reviews.
     */
    cursor?: reviewsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of reviews.
     */
    distinct?: ReviewsScalarFieldEnum | ReviewsScalarFieldEnum[]
  }

  /**
   * reviews findMany
   */
  export type reviewsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    /**
     * Filter, which reviews to fetch.
     */
    where?: reviewsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reviews to fetch.
     */
    orderBy?: reviewsOrderByWithRelationInput | reviewsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing reviews.
     */
    cursor?: reviewsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reviews.
     */
    skip?: number
    distinct?: ReviewsScalarFieldEnum | ReviewsScalarFieldEnum[]
  }

  /**
   * reviews create
   */
  export type reviewsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    /**
     * The data needed to create a reviews.
     */
    data: XOR<reviewsCreateInput, reviewsUncheckedCreateInput>
  }

  /**
   * reviews createMany
   */
  export type reviewsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many reviews.
     */
    data: reviewsCreateManyInput | reviewsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * reviews createManyAndReturn
   */
  export type reviewsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many reviews.
     */
    data: reviewsCreateManyInput | reviewsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * reviews update
   */
  export type reviewsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    /**
     * The data needed to update a reviews.
     */
    data: XOR<reviewsUpdateInput, reviewsUncheckedUpdateInput>
    /**
     * Choose, which reviews to update.
     */
    where: reviewsWhereUniqueInput
  }

  /**
   * reviews updateMany
   */
  export type reviewsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update reviews.
     */
    data: XOR<reviewsUpdateManyMutationInput, reviewsUncheckedUpdateManyInput>
    /**
     * Filter which reviews to update
     */
    where?: reviewsWhereInput
  }

  /**
   * reviews upsert
   */
  export type reviewsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    /**
     * The filter to search for the reviews to update in case it exists.
     */
    where: reviewsWhereUniqueInput
    /**
     * In case the reviews found by the `where` argument doesn't exist, create a new reviews with this data.
     */
    create: XOR<reviewsCreateInput, reviewsUncheckedCreateInput>
    /**
     * In case the reviews was found with the provided `where` argument, update it with this data.
     */
    update: XOR<reviewsUpdateInput, reviewsUncheckedUpdateInput>
  }

  /**
   * reviews delete
   */
  export type reviewsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    /**
     * Filter which reviews to delete.
     */
    where: reviewsWhereUniqueInput
  }

  /**
   * reviews deleteMany
   */
  export type reviewsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which reviews to delete
     */
    where?: reviewsWhereInput
  }

  /**
   * reviews without action
   */
  export type reviewsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UsersScalarFieldEnum: {
    id: 'id',
    auth_id: 'auth_id',
    first_name: 'first_name',
    last_name: 'last_name',
    email: 'email',
    birth_date: 'birth_date',
    explorer_type: 'explorer_type',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const User_preferencesScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    category: 'category',
    interest_level: 'interest_level',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type User_preferencesScalarFieldEnum = (typeof User_preferencesScalarFieldEnum)[keyof typeof User_preferencesScalarFieldEnum]


  export const PlacesScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    category: 'category',
    latitude: 'latitude',
    longitude: 'longitude',
    address: 'address',
    city: 'city',
    images: 'images',
    tags: 'tags',
    opening_hours: 'opening_hours',
    average_rating: 'average_rating',
    total_reviews: 'total_reviews',
    heat_score: 'heat_score',
    created_at: 'created_at',
    updated_at: 'updated_at',
    googleMapsUri: 'googleMapsUri',
    websiteUri: 'websiteUri',
    nationalPhoneNumber: 'nationalPhoneNumber',
    internationalPhoneNumber: 'internationalPhoneNumber',
    take_out: 'take_out',
    delivery: 'delivery',
    dine_in: 'dine_in',
    reservable: 'reservable',
    serves_breakfast: 'serves_breakfast',
    serves_lunch: 'serves_lunch',
    serves_dinner: 'serves_dinner',
    serves_beer: 'serves_beer',
    serves_wine: 'serves_wine',
    serves_brunch: 'serves_brunch',
    serves_vegetarian_food: 'serves_vegetarian_food',
    outdoor_seating: 'outdoor_seating',
    live_music: 'live_music',
    menu_for_children: 'menu_for_children',
    serves_cocktails: 'serves_cocktails',
    serves_dessert: 'serves_dessert',
    serves_coffee: 'serves_coffee',
    good_for_children: 'good_for_children',
    restroom: 'restroom',
    good_for_groups: 'good_for_groups',
    good_for_watching_sports: 'good_for_watching_sports',
    priceLevel: 'priceLevel',
    timeZone: 'timeZone',
    acceptsCreditCards: 'acceptsCreditCards',
    acceptsDebitCards: 'acceptsDebitCards',
    acceptsCashOnly: 'acceptsCashOnly',
    acceptsNfc: 'acceptsNfc',
    freeParkingLot: 'freeParkingLot',
    freeStreetParking: 'freeStreetParking',
    paidParkingLot: 'paidParkingLot',
    valetParking: 'valetParking',
    wheelchairAccessibleParking: 'wheelchairAccessibleParking',
    wheelchairAccessibleEntrance: 'wheelchairAccessibleEntrance',
    wheelchairAccessibleRestroom: 'wheelchairAccessibleRestroom',
    wheelchairAccessibleSeating: 'wheelchairAccessibleSeating',
    directionsUri: 'directionsUri',
    placeUri: 'placeUri',
    writeAReviewUri: 'writeAReviewUri',
    reviewsUri: 'reviewsUri',
    photosUri: 'photosUri',
    google_average_rating: 'google_average_rating',
    google_total_reviews: 'google_total_reviews'
  };

  export type PlacesScalarFieldEnum = (typeof PlacesScalarFieldEnum)[keyof typeof PlacesScalarFieldEnum]


  export const ReviewsScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    place_id: 'place_id',
    rating: 'rating',
    comment: 'comment',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ReviewsScalarFieldEnum = (typeof ReviewsScalarFieldEnum)[keyof typeof ReviewsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    id?: StringFilter<"users"> | string
    auth_id?: StringFilter<"users"> | string
    first_name?: StringFilter<"users"> | string
    last_name?: StringFilter<"users"> | string
    email?: StringFilter<"users"> | string
    birth_date?: DateTimeFilter<"users"> | Date | string
    explorer_type?: StringFilter<"users"> | string
    created_at?: DateTimeFilter<"users"> | Date | string
    updated_at?: DateTimeFilter<"users"> | Date | string
    preferences?: User_preferencesListRelationFilter
    reviews?: ReviewsListRelationFilter
  }

  export type usersOrderByWithRelationInput = {
    id?: SortOrder
    auth_id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
    birth_date?: SortOrder
    explorer_type?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    preferences?: user_preferencesOrderByRelationAggregateInput
    reviews?: reviewsOrderByRelationAggregateInput
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    auth_id?: string
    email?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    first_name?: StringFilter<"users"> | string
    last_name?: StringFilter<"users"> | string
    birth_date?: DateTimeFilter<"users"> | Date | string
    explorer_type?: StringFilter<"users"> | string
    created_at?: DateTimeFilter<"users"> | Date | string
    updated_at?: DateTimeFilter<"users"> | Date | string
    preferences?: User_preferencesListRelationFilter
    reviews?: ReviewsListRelationFilter
  }, "id" | "auth_id" | "email">

  export type usersOrderByWithAggregationInput = {
    id?: SortOrder
    auth_id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
    birth_date?: SortOrder
    explorer_type?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: usersCountOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"users"> | string
    auth_id?: StringWithAggregatesFilter<"users"> | string
    first_name?: StringWithAggregatesFilter<"users"> | string
    last_name?: StringWithAggregatesFilter<"users"> | string
    email?: StringWithAggregatesFilter<"users"> | string
    birth_date?: DateTimeWithAggregatesFilter<"users"> | Date | string
    explorer_type?: StringWithAggregatesFilter<"users"> | string
    created_at?: DateTimeWithAggregatesFilter<"users"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"users"> | Date | string
  }

  export type user_preferencesWhereInput = {
    AND?: user_preferencesWhereInput | user_preferencesWhereInput[]
    OR?: user_preferencesWhereInput[]
    NOT?: user_preferencesWhereInput | user_preferencesWhereInput[]
    id?: StringFilter<"user_preferences"> | string
    user_id?: StringFilter<"user_preferences"> | string
    category?: StringFilter<"user_preferences"> | string
    interest_level?: IntFilter<"user_preferences"> | number
    created_at?: DateTimeFilter<"user_preferences"> | Date | string
    updated_at?: DateTimeFilter<"user_preferences"> | Date | string
    user?: XOR<UsersRelationFilter, usersWhereInput>
  }

  export type user_preferencesOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    category?: SortOrder
    interest_level?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user?: usersOrderByWithRelationInput
  }

  export type user_preferencesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    user_id_category?: user_preferencesUser_idCategoryCompoundUniqueInput
    AND?: user_preferencesWhereInput | user_preferencesWhereInput[]
    OR?: user_preferencesWhereInput[]
    NOT?: user_preferencesWhereInput | user_preferencesWhereInput[]
    user_id?: StringFilter<"user_preferences"> | string
    category?: StringFilter<"user_preferences"> | string
    interest_level?: IntFilter<"user_preferences"> | number
    created_at?: DateTimeFilter<"user_preferences"> | Date | string
    updated_at?: DateTimeFilter<"user_preferences"> | Date | string
    user?: XOR<UsersRelationFilter, usersWhereInput>
  }, "id" | "user_id_category">

  export type user_preferencesOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    category?: SortOrder
    interest_level?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: user_preferencesCountOrderByAggregateInput
    _avg?: user_preferencesAvgOrderByAggregateInput
    _max?: user_preferencesMaxOrderByAggregateInput
    _min?: user_preferencesMinOrderByAggregateInput
    _sum?: user_preferencesSumOrderByAggregateInput
  }

  export type user_preferencesScalarWhereWithAggregatesInput = {
    AND?: user_preferencesScalarWhereWithAggregatesInput | user_preferencesScalarWhereWithAggregatesInput[]
    OR?: user_preferencesScalarWhereWithAggregatesInput[]
    NOT?: user_preferencesScalarWhereWithAggregatesInput | user_preferencesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"user_preferences"> | string
    user_id?: StringWithAggregatesFilter<"user_preferences"> | string
    category?: StringWithAggregatesFilter<"user_preferences"> | string
    interest_level?: IntWithAggregatesFilter<"user_preferences"> | number
    created_at?: DateTimeWithAggregatesFilter<"user_preferences"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"user_preferences"> | Date | string
  }

  export type placesWhereInput = {
    AND?: placesWhereInput | placesWhereInput[]
    OR?: placesWhereInput[]
    NOT?: placesWhereInput | placesWhereInput[]
    id?: StringFilter<"places"> | string
    name?: StringFilter<"places"> | string
    description?: StringFilter<"places"> | string
    category?: StringFilter<"places"> | string
    latitude?: FloatFilter<"places"> | number
    longitude?: FloatFilter<"places"> | number
    address?: StringFilter<"places"> | string
    city?: StringFilter<"places"> | string
    images?: StringNullableListFilter<"places">
    tags?: StringNullableListFilter<"places">
    opening_hours?: JsonNullableFilter<"places">
    average_rating?: FloatFilter<"places"> | number
    total_reviews?: IntFilter<"places"> | number
    heat_score?: FloatFilter<"places"> | number
    created_at?: DateTimeFilter<"places"> | Date | string
    updated_at?: DateTimeFilter<"places"> | Date | string
    googleMapsUri?: StringFilter<"places"> | string
    websiteUri?: StringFilter<"places"> | string
    nationalPhoneNumber?: StringNullableFilter<"places"> | string | null
    internationalPhoneNumber?: StringNullableFilter<"places"> | string | null
    take_out?: BoolFilter<"places"> | boolean
    delivery?: BoolFilter<"places"> | boolean
    dine_in?: BoolFilter<"places"> | boolean
    reservable?: BoolFilter<"places"> | boolean
    serves_breakfast?: BoolFilter<"places"> | boolean
    serves_lunch?: BoolFilter<"places"> | boolean
    serves_dinner?: BoolFilter<"places"> | boolean
    serves_beer?: BoolFilter<"places"> | boolean
    serves_wine?: BoolFilter<"places"> | boolean
    serves_brunch?: BoolFilter<"places"> | boolean
    serves_vegetarian_food?: BoolFilter<"places"> | boolean
    outdoor_seating?: BoolFilter<"places"> | boolean
    live_music?: BoolFilter<"places"> | boolean
    menu_for_children?: BoolFilter<"places"> | boolean
    serves_cocktails?: BoolFilter<"places"> | boolean
    serves_dessert?: BoolFilter<"places"> | boolean
    serves_coffee?: BoolFilter<"places"> | boolean
    good_for_children?: BoolFilter<"places"> | boolean
    restroom?: BoolFilter<"places"> | boolean
    good_for_groups?: BoolFilter<"places"> | boolean
    good_for_watching_sports?: BoolFilter<"places"> | boolean
    priceLevel?: StringFilter<"places"> | string
    timeZone?: StringFilter<"places"> | string
    acceptsCreditCards?: BoolFilter<"places"> | boolean
    acceptsDebitCards?: BoolFilter<"places"> | boolean
    acceptsCashOnly?: BoolFilter<"places"> | boolean
    acceptsNfc?: BoolFilter<"places"> | boolean
    freeParkingLot?: BoolFilter<"places"> | boolean
    freeStreetParking?: BoolFilter<"places"> | boolean
    paidParkingLot?: BoolFilter<"places"> | boolean
    valetParking?: BoolFilter<"places"> | boolean
    wheelchairAccessibleParking?: BoolFilter<"places"> | boolean
    wheelchairAccessibleEntrance?: BoolFilter<"places"> | boolean
    wheelchairAccessibleRestroom?: BoolFilter<"places"> | boolean
    wheelchairAccessibleSeating?: BoolFilter<"places"> | boolean
    directionsUri?: StringFilter<"places"> | string
    placeUri?: StringFilter<"places"> | string
    writeAReviewUri?: StringFilter<"places"> | string
    reviewsUri?: StringFilter<"places"> | string
    photosUri?: StringFilter<"places"> | string
    google_average_rating?: FloatFilter<"places"> | number
    google_total_reviews?: IntFilter<"places"> | number
    reviews?: ReviewsListRelationFilter
  }

  export type placesOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    address?: SortOrder
    city?: SortOrder
    images?: SortOrder
    tags?: SortOrder
    opening_hours?: SortOrderInput | SortOrder
    average_rating?: SortOrder
    total_reviews?: SortOrder
    heat_score?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    googleMapsUri?: SortOrder
    websiteUri?: SortOrder
    nationalPhoneNumber?: SortOrderInput | SortOrder
    internationalPhoneNumber?: SortOrderInput | SortOrder
    take_out?: SortOrder
    delivery?: SortOrder
    dine_in?: SortOrder
    reservable?: SortOrder
    serves_breakfast?: SortOrder
    serves_lunch?: SortOrder
    serves_dinner?: SortOrder
    serves_beer?: SortOrder
    serves_wine?: SortOrder
    serves_brunch?: SortOrder
    serves_vegetarian_food?: SortOrder
    outdoor_seating?: SortOrder
    live_music?: SortOrder
    menu_for_children?: SortOrder
    serves_cocktails?: SortOrder
    serves_dessert?: SortOrder
    serves_coffee?: SortOrder
    good_for_children?: SortOrder
    restroom?: SortOrder
    good_for_groups?: SortOrder
    good_for_watching_sports?: SortOrder
    priceLevel?: SortOrder
    timeZone?: SortOrder
    acceptsCreditCards?: SortOrder
    acceptsDebitCards?: SortOrder
    acceptsCashOnly?: SortOrder
    acceptsNfc?: SortOrder
    freeParkingLot?: SortOrder
    freeStreetParking?: SortOrder
    paidParkingLot?: SortOrder
    valetParking?: SortOrder
    wheelchairAccessibleParking?: SortOrder
    wheelchairAccessibleEntrance?: SortOrder
    wheelchairAccessibleRestroom?: SortOrder
    wheelchairAccessibleSeating?: SortOrder
    directionsUri?: SortOrder
    placeUri?: SortOrder
    writeAReviewUri?: SortOrder
    reviewsUri?: SortOrder
    photosUri?: SortOrder
    google_average_rating?: SortOrder
    google_total_reviews?: SortOrder
    reviews?: reviewsOrderByRelationAggregateInput
  }

  export type placesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: placesWhereInput | placesWhereInput[]
    OR?: placesWhereInput[]
    NOT?: placesWhereInput | placesWhereInput[]
    name?: StringFilter<"places"> | string
    description?: StringFilter<"places"> | string
    category?: StringFilter<"places"> | string
    latitude?: FloatFilter<"places"> | number
    longitude?: FloatFilter<"places"> | number
    address?: StringFilter<"places"> | string
    city?: StringFilter<"places"> | string
    images?: StringNullableListFilter<"places">
    tags?: StringNullableListFilter<"places">
    opening_hours?: JsonNullableFilter<"places">
    average_rating?: FloatFilter<"places"> | number
    total_reviews?: IntFilter<"places"> | number
    heat_score?: FloatFilter<"places"> | number
    created_at?: DateTimeFilter<"places"> | Date | string
    updated_at?: DateTimeFilter<"places"> | Date | string
    googleMapsUri?: StringFilter<"places"> | string
    websiteUri?: StringFilter<"places"> | string
    nationalPhoneNumber?: StringNullableFilter<"places"> | string | null
    internationalPhoneNumber?: StringNullableFilter<"places"> | string | null
    take_out?: BoolFilter<"places"> | boolean
    delivery?: BoolFilter<"places"> | boolean
    dine_in?: BoolFilter<"places"> | boolean
    reservable?: BoolFilter<"places"> | boolean
    serves_breakfast?: BoolFilter<"places"> | boolean
    serves_lunch?: BoolFilter<"places"> | boolean
    serves_dinner?: BoolFilter<"places"> | boolean
    serves_beer?: BoolFilter<"places"> | boolean
    serves_wine?: BoolFilter<"places"> | boolean
    serves_brunch?: BoolFilter<"places"> | boolean
    serves_vegetarian_food?: BoolFilter<"places"> | boolean
    outdoor_seating?: BoolFilter<"places"> | boolean
    live_music?: BoolFilter<"places"> | boolean
    menu_for_children?: BoolFilter<"places"> | boolean
    serves_cocktails?: BoolFilter<"places"> | boolean
    serves_dessert?: BoolFilter<"places"> | boolean
    serves_coffee?: BoolFilter<"places"> | boolean
    good_for_children?: BoolFilter<"places"> | boolean
    restroom?: BoolFilter<"places"> | boolean
    good_for_groups?: BoolFilter<"places"> | boolean
    good_for_watching_sports?: BoolFilter<"places"> | boolean
    priceLevel?: StringFilter<"places"> | string
    timeZone?: StringFilter<"places"> | string
    acceptsCreditCards?: BoolFilter<"places"> | boolean
    acceptsDebitCards?: BoolFilter<"places"> | boolean
    acceptsCashOnly?: BoolFilter<"places"> | boolean
    acceptsNfc?: BoolFilter<"places"> | boolean
    freeParkingLot?: BoolFilter<"places"> | boolean
    freeStreetParking?: BoolFilter<"places"> | boolean
    paidParkingLot?: BoolFilter<"places"> | boolean
    valetParking?: BoolFilter<"places"> | boolean
    wheelchairAccessibleParking?: BoolFilter<"places"> | boolean
    wheelchairAccessibleEntrance?: BoolFilter<"places"> | boolean
    wheelchairAccessibleRestroom?: BoolFilter<"places"> | boolean
    wheelchairAccessibleSeating?: BoolFilter<"places"> | boolean
    directionsUri?: StringFilter<"places"> | string
    placeUri?: StringFilter<"places"> | string
    writeAReviewUri?: StringFilter<"places"> | string
    reviewsUri?: StringFilter<"places"> | string
    photosUri?: StringFilter<"places"> | string
    google_average_rating?: FloatFilter<"places"> | number
    google_total_reviews?: IntFilter<"places"> | number
    reviews?: ReviewsListRelationFilter
  }, "id" | "id">

  export type placesOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    address?: SortOrder
    city?: SortOrder
    images?: SortOrder
    tags?: SortOrder
    opening_hours?: SortOrderInput | SortOrder
    average_rating?: SortOrder
    total_reviews?: SortOrder
    heat_score?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    googleMapsUri?: SortOrder
    websiteUri?: SortOrder
    nationalPhoneNumber?: SortOrderInput | SortOrder
    internationalPhoneNumber?: SortOrderInput | SortOrder
    take_out?: SortOrder
    delivery?: SortOrder
    dine_in?: SortOrder
    reservable?: SortOrder
    serves_breakfast?: SortOrder
    serves_lunch?: SortOrder
    serves_dinner?: SortOrder
    serves_beer?: SortOrder
    serves_wine?: SortOrder
    serves_brunch?: SortOrder
    serves_vegetarian_food?: SortOrder
    outdoor_seating?: SortOrder
    live_music?: SortOrder
    menu_for_children?: SortOrder
    serves_cocktails?: SortOrder
    serves_dessert?: SortOrder
    serves_coffee?: SortOrder
    good_for_children?: SortOrder
    restroom?: SortOrder
    good_for_groups?: SortOrder
    good_for_watching_sports?: SortOrder
    priceLevel?: SortOrder
    timeZone?: SortOrder
    acceptsCreditCards?: SortOrder
    acceptsDebitCards?: SortOrder
    acceptsCashOnly?: SortOrder
    acceptsNfc?: SortOrder
    freeParkingLot?: SortOrder
    freeStreetParking?: SortOrder
    paidParkingLot?: SortOrder
    valetParking?: SortOrder
    wheelchairAccessibleParking?: SortOrder
    wheelchairAccessibleEntrance?: SortOrder
    wheelchairAccessibleRestroom?: SortOrder
    wheelchairAccessibleSeating?: SortOrder
    directionsUri?: SortOrder
    placeUri?: SortOrder
    writeAReviewUri?: SortOrder
    reviewsUri?: SortOrder
    photosUri?: SortOrder
    google_average_rating?: SortOrder
    google_total_reviews?: SortOrder
    _count?: placesCountOrderByAggregateInput
    _avg?: placesAvgOrderByAggregateInput
    _max?: placesMaxOrderByAggregateInput
    _min?: placesMinOrderByAggregateInput
    _sum?: placesSumOrderByAggregateInput
  }

  export type placesScalarWhereWithAggregatesInput = {
    AND?: placesScalarWhereWithAggregatesInput | placesScalarWhereWithAggregatesInput[]
    OR?: placesScalarWhereWithAggregatesInput[]
    NOT?: placesScalarWhereWithAggregatesInput | placesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"places"> | string
    name?: StringWithAggregatesFilter<"places"> | string
    description?: StringWithAggregatesFilter<"places"> | string
    category?: StringWithAggregatesFilter<"places"> | string
    latitude?: FloatWithAggregatesFilter<"places"> | number
    longitude?: FloatWithAggregatesFilter<"places"> | number
    address?: StringWithAggregatesFilter<"places"> | string
    city?: StringWithAggregatesFilter<"places"> | string
    images?: StringNullableListFilter<"places">
    tags?: StringNullableListFilter<"places">
    opening_hours?: JsonNullableWithAggregatesFilter<"places">
    average_rating?: FloatWithAggregatesFilter<"places"> | number
    total_reviews?: IntWithAggregatesFilter<"places"> | number
    heat_score?: FloatWithAggregatesFilter<"places"> | number
    created_at?: DateTimeWithAggregatesFilter<"places"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"places"> | Date | string
    googleMapsUri?: StringWithAggregatesFilter<"places"> | string
    websiteUri?: StringWithAggregatesFilter<"places"> | string
    nationalPhoneNumber?: StringNullableWithAggregatesFilter<"places"> | string | null
    internationalPhoneNumber?: StringNullableWithAggregatesFilter<"places"> | string | null
    take_out?: BoolWithAggregatesFilter<"places"> | boolean
    delivery?: BoolWithAggregatesFilter<"places"> | boolean
    dine_in?: BoolWithAggregatesFilter<"places"> | boolean
    reservable?: BoolWithAggregatesFilter<"places"> | boolean
    serves_breakfast?: BoolWithAggregatesFilter<"places"> | boolean
    serves_lunch?: BoolWithAggregatesFilter<"places"> | boolean
    serves_dinner?: BoolWithAggregatesFilter<"places"> | boolean
    serves_beer?: BoolWithAggregatesFilter<"places"> | boolean
    serves_wine?: BoolWithAggregatesFilter<"places"> | boolean
    serves_brunch?: BoolWithAggregatesFilter<"places"> | boolean
    serves_vegetarian_food?: BoolWithAggregatesFilter<"places"> | boolean
    outdoor_seating?: BoolWithAggregatesFilter<"places"> | boolean
    live_music?: BoolWithAggregatesFilter<"places"> | boolean
    menu_for_children?: BoolWithAggregatesFilter<"places"> | boolean
    serves_cocktails?: BoolWithAggregatesFilter<"places"> | boolean
    serves_dessert?: BoolWithAggregatesFilter<"places"> | boolean
    serves_coffee?: BoolWithAggregatesFilter<"places"> | boolean
    good_for_children?: BoolWithAggregatesFilter<"places"> | boolean
    restroom?: BoolWithAggregatesFilter<"places"> | boolean
    good_for_groups?: BoolWithAggregatesFilter<"places"> | boolean
    good_for_watching_sports?: BoolWithAggregatesFilter<"places"> | boolean
    priceLevel?: StringWithAggregatesFilter<"places"> | string
    timeZone?: StringWithAggregatesFilter<"places"> | string
    acceptsCreditCards?: BoolWithAggregatesFilter<"places"> | boolean
    acceptsDebitCards?: BoolWithAggregatesFilter<"places"> | boolean
    acceptsCashOnly?: BoolWithAggregatesFilter<"places"> | boolean
    acceptsNfc?: BoolWithAggregatesFilter<"places"> | boolean
    freeParkingLot?: BoolWithAggregatesFilter<"places"> | boolean
    freeStreetParking?: BoolWithAggregatesFilter<"places"> | boolean
    paidParkingLot?: BoolWithAggregatesFilter<"places"> | boolean
    valetParking?: BoolWithAggregatesFilter<"places"> | boolean
    wheelchairAccessibleParking?: BoolWithAggregatesFilter<"places"> | boolean
    wheelchairAccessibleEntrance?: BoolWithAggregatesFilter<"places"> | boolean
    wheelchairAccessibleRestroom?: BoolWithAggregatesFilter<"places"> | boolean
    wheelchairAccessibleSeating?: BoolWithAggregatesFilter<"places"> | boolean
    directionsUri?: StringWithAggregatesFilter<"places"> | string
    placeUri?: StringWithAggregatesFilter<"places"> | string
    writeAReviewUri?: StringWithAggregatesFilter<"places"> | string
    reviewsUri?: StringWithAggregatesFilter<"places"> | string
    photosUri?: StringWithAggregatesFilter<"places"> | string
    google_average_rating?: FloatWithAggregatesFilter<"places"> | number
    google_total_reviews?: IntWithAggregatesFilter<"places"> | number
  }

  export type reviewsWhereInput = {
    AND?: reviewsWhereInput | reviewsWhereInput[]
    OR?: reviewsWhereInput[]
    NOT?: reviewsWhereInput | reviewsWhereInput[]
    id?: StringFilter<"reviews"> | string
    user_id?: StringFilter<"reviews"> | string
    place_id?: StringFilter<"reviews"> | string
    rating?: IntFilter<"reviews"> | number
    comment?: StringNullableFilter<"reviews"> | string | null
    created_at?: DateTimeFilter<"reviews"> | Date | string
    updated_at?: DateTimeFilter<"reviews"> | Date | string
    user?: XOR<UsersRelationFilter, usersWhereInput>
    place?: XOR<PlacesRelationFilter, placesWhereInput>
  }

  export type reviewsOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    place_id?: SortOrder
    rating?: SortOrder
    comment?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user?: usersOrderByWithRelationInput
    place?: placesOrderByWithRelationInput
  }

  export type reviewsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    user_id_place_id?: reviewsUser_idPlace_idCompoundUniqueInput
    AND?: reviewsWhereInput | reviewsWhereInput[]
    OR?: reviewsWhereInput[]
    NOT?: reviewsWhereInput | reviewsWhereInput[]
    user_id?: StringFilter<"reviews"> | string
    place_id?: StringFilter<"reviews"> | string
    rating?: IntFilter<"reviews"> | number
    comment?: StringNullableFilter<"reviews"> | string | null
    created_at?: DateTimeFilter<"reviews"> | Date | string
    updated_at?: DateTimeFilter<"reviews"> | Date | string
    user?: XOR<UsersRelationFilter, usersWhereInput>
    place?: XOR<PlacesRelationFilter, placesWhereInput>
  }, "id" | "user_id_place_id">

  export type reviewsOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    place_id?: SortOrder
    rating?: SortOrder
    comment?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: reviewsCountOrderByAggregateInput
    _avg?: reviewsAvgOrderByAggregateInput
    _max?: reviewsMaxOrderByAggregateInput
    _min?: reviewsMinOrderByAggregateInput
    _sum?: reviewsSumOrderByAggregateInput
  }

  export type reviewsScalarWhereWithAggregatesInput = {
    AND?: reviewsScalarWhereWithAggregatesInput | reviewsScalarWhereWithAggregatesInput[]
    OR?: reviewsScalarWhereWithAggregatesInput[]
    NOT?: reviewsScalarWhereWithAggregatesInput | reviewsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"reviews"> | string
    user_id?: StringWithAggregatesFilter<"reviews"> | string
    place_id?: StringWithAggregatesFilter<"reviews"> | string
    rating?: IntWithAggregatesFilter<"reviews"> | number
    comment?: StringNullableWithAggregatesFilter<"reviews"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"reviews"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"reviews"> | Date | string
  }

  export type usersCreateInput = {
    id?: string
    auth_id: string
    first_name: string
    last_name: string
    email: string
    birth_date: Date | string
    explorer_type?: string
    created_at?: Date | string
    updated_at?: Date | string
    preferences?: user_preferencesCreateNestedManyWithoutUserInput
    reviews?: reviewsCreateNestedManyWithoutUserInput
  }

  export type usersUncheckedCreateInput = {
    id?: string
    auth_id: string
    first_name: string
    last_name: string
    email: string
    birth_date: Date | string
    explorer_type?: string
    created_at?: Date | string
    updated_at?: Date | string
    preferences?: user_preferencesUncheckedCreateNestedManyWithoutUserInput
    reviews?: reviewsUncheckedCreateNestedManyWithoutUserInput
  }

  export type usersUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    auth_id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    birth_date?: DateTimeFieldUpdateOperationsInput | Date | string
    explorer_type?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    preferences?: user_preferencesUpdateManyWithoutUserNestedInput
    reviews?: reviewsUpdateManyWithoutUserNestedInput
  }

  export type usersUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    auth_id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    birth_date?: DateTimeFieldUpdateOperationsInput | Date | string
    explorer_type?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    preferences?: user_preferencesUncheckedUpdateManyWithoutUserNestedInput
    reviews?: reviewsUncheckedUpdateManyWithoutUserNestedInput
  }

  export type usersCreateManyInput = {
    id?: string
    auth_id: string
    first_name: string
    last_name: string
    email: string
    birth_date: Date | string
    explorer_type?: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type usersUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    auth_id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    birth_date?: DateTimeFieldUpdateOperationsInput | Date | string
    explorer_type?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type usersUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    auth_id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    birth_date?: DateTimeFieldUpdateOperationsInput | Date | string
    explorer_type?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type user_preferencesCreateInput = {
    id?: string
    category: string
    interest_level: number
    created_at?: Date | string
    updated_at?: Date | string
    user: usersCreateNestedOneWithoutPreferencesInput
  }

  export type user_preferencesUncheckedCreateInput = {
    id?: string
    user_id: string
    category: string
    interest_level: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type user_preferencesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    interest_level?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: usersUpdateOneRequiredWithoutPreferencesNestedInput
  }

  export type user_preferencesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    interest_level?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type user_preferencesCreateManyInput = {
    id?: string
    user_id: string
    category: string
    interest_level: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type user_preferencesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    interest_level?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type user_preferencesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    interest_level?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type placesCreateInput = {
    id?: string
    name: string
    description: string
    category: string
    latitude: number
    longitude: number
    address: string
    city: string
    images?: placesCreateimagesInput | string[]
    tags?: placesCreatetagsInput | string[]
    opening_hours?: NullableJsonNullValueInput | InputJsonValue
    average_rating?: number
    total_reviews?: number
    heat_score?: number
    created_at?: Date | string
    updated_at?: Date | string
    googleMapsUri?: string
    websiteUri?: string
    nationalPhoneNumber?: string | null
    internationalPhoneNumber?: string | null
    take_out?: boolean
    delivery?: boolean
    dine_in?: boolean
    reservable?: boolean
    serves_breakfast?: boolean
    serves_lunch?: boolean
    serves_dinner?: boolean
    serves_beer?: boolean
    serves_wine?: boolean
    serves_brunch?: boolean
    serves_vegetarian_food?: boolean
    outdoor_seating?: boolean
    live_music?: boolean
    menu_for_children?: boolean
    serves_cocktails?: boolean
    serves_dessert?: boolean
    serves_coffee?: boolean
    good_for_children?: boolean
    restroom?: boolean
    good_for_groups?: boolean
    good_for_watching_sports?: boolean
    priceLevel?: string
    timeZone?: string
    acceptsCreditCards?: boolean
    acceptsDebitCards?: boolean
    acceptsCashOnly?: boolean
    acceptsNfc?: boolean
    freeParkingLot?: boolean
    freeStreetParking?: boolean
    paidParkingLot?: boolean
    valetParking?: boolean
    wheelchairAccessibleParking?: boolean
    wheelchairAccessibleEntrance?: boolean
    wheelchairAccessibleRestroom?: boolean
    wheelchairAccessibleSeating?: boolean
    directionsUri?: string
    placeUri?: string
    writeAReviewUri?: string
    reviewsUri?: string
    photosUri?: string
    google_average_rating?: number
    google_total_reviews?: number
    reviews?: reviewsCreateNestedManyWithoutPlaceInput
  }

  export type placesUncheckedCreateInput = {
    id?: string
    name: string
    description: string
    category: string
    latitude: number
    longitude: number
    address: string
    city: string
    images?: placesCreateimagesInput | string[]
    tags?: placesCreatetagsInput | string[]
    opening_hours?: NullableJsonNullValueInput | InputJsonValue
    average_rating?: number
    total_reviews?: number
    heat_score?: number
    created_at?: Date | string
    updated_at?: Date | string
    googleMapsUri?: string
    websiteUri?: string
    nationalPhoneNumber?: string | null
    internationalPhoneNumber?: string | null
    take_out?: boolean
    delivery?: boolean
    dine_in?: boolean
    reservable?: boolean
    serves_breakfast?: boolean
    serves_lunch?: boolean
    serves_dinner?: boolean
    serves_beer?: boolean
    serves_wine?: boolean
    serves_brunch?: boolean
    serves_vegetarian_food?: boolean
    outdoor_seating?: boolean
    live_music?: boolean
    menu_for_children?: boolean
    serves_cocktails?: boolean
    serves_dessert?: boolean
    serves_coffee?: boolean
    good_for_children?: boolean
    restroom?: boolean
    good_for_groups?: boolean
    good_for_watching_sports?: boolean
    priceLevel?: string
    timeZone?: string
    acceptsCreditCards?: boolean
    acceptsDebitCards?: boolean
    acceptsCashOnly?: boolean
    acceptsNfc?: boolean
    freeParkingLot?: boolean
    freeStreetParking?: boolean
    paidParkingLot?: boolean
    valetParking?: boolean
    wheelchairAccessibleParking?: boolean
    wheelchairAccessibleEntrance?: boolean
    wheelchairAccessibleRestroom?: boolean
    wheelchairAccessibleSeating?: boolean
    directionsUri?: string
    placeUri?: string
    writeAReviewUri?: string
    reviewsUri?: string
    photosUri?: string
    google_average_rating?: number
    google_total_reviews?: number
    reviews?: reviewsUncheckedCreateNestedManyWithoutPlaceInput
  }

  export type placesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    images?: placesUpdateimagesInput | string[]
    tags?: placesUpdatetagsInput | string[]
    opening_hours?: NullableJsonNullValueInput | InputJsonValue
    average_rating?: FloatFieldUpdateOperationsInput | number
    total_reviews?: IntFieldUpdateOperationsInput | number
    heat_score?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    googleMapsUri?: StringFieldUpdateOperationsInput | string
    websiteUri?: StringFieldUpdateOperationsInput | string
    nationalPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    internationalPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    take_out?: BoolFieldUpdateOperationsInput | boolean
    delivery?: BoolFieldUpdateOperationsInput | boolean
    dine_in?: BoolFieldUpdateOperationsInput | boolean
    reservable?: BoolFieldUpdateOperationsInput | boolean
    serves_breakfast?: BoolFieldUpdateOperationsInput | boolean
    serves_lunch?: BoolFieldUpdateOperationsInput | boolean
    serves_dinner?: BoolFieldUpdateOperationsInput | boolean
    serves_beer?: BoolFieldUpdateOperationsInput | boolean
    serves_wine?: BoolFieldUpdateOperationsInput | boolean
    serves_brunch?: BoolFieldUpdateOperationsInput | boolean
    serves_vegetarian_food?: BoolFieldUpdateOperationsInput | boolean
    outdoor_seating?: BoolFieldUpdateOperationsInput | boolean
    live_music?: BoolFieldUpdateOperationsInput | boolean
    menu_for_children?: BoolFieldUpdateOperationsInput | boolean
    serves_cocktails?: BoolFieldUpdateOperationsInput | boolean
    serves_dessert?: BoolFieldUpdateOperationsInput | boolean
    serves_coffee?: BoolFieldUpdateOperationsInput | boolean
    good_for_children?: BoolFieldUpdateOperationsInput | boolean
    restroom?: BoolFieldUpdateOperationsInput | boolean
    good_for_groups?: BoolFieldUpdateOperationsInput | boolean
    good_for_watching_sports?: BoolFieldUpdateOperationsInput | boolean
    priceLevel?: StringFieldUpdateOperationsInput | string
    timeZone?: StringFieldUpdateOperationsInput | string
    acceptsCreditCards?: BoolFieldUpdateOperationsInput | boolean
    acceptsDebitCards?: BoolFieldUpdateOperationsInput | boolean
    acceptsCashOnly?: BoolFieldUpdateOperationsInput | boolean
    acceptsNfc?: BoolFieldUpdateOperationsInput | boolean
    freeParkingLot?: BoolFieldUpdateOperationsInput | boolean
    freeStreetParking?: BoolFieldUpdateOperationsInput | boolean
    paidParkingLot?: BoolFieldUpdateOperationsInput | boolean
    valetParking?: BoolFieldUpdateOperationsInput | boolean
    wheelchairAccessibleParking?: BoolFieldUpdateOperationsInput | boolean
    wheelchairAccessibleEntrance?: BoolFieldUpdateOperationsInput | boolean
    wheelchairAccessibleRestroom?: BoolFieldUpdateOperationsInput | boolean
    wheelchairAccessibleSeating?: BoolFieldUpdateOperationsInput | boolean
    directionsUri?: StringFieldUpdateOperationsInput | string
    placeUri?: StringFieldUpdateOperationsInput | string
    writeAReviewUri?: StringFieldUpdateOperationsInput | string
    reviewsUri?: StringFieldUpdateOperationsInput | string
    photosUri?: StringFieldUpdateOperationsInput | string
    google_average_rating?: FloatFieldUpdateOperationsInput | number
    google_total_reviews?: IntFieldUpdateOperationsInput | number
    reviews?: reviewsUpdateManyWithoutPlaceNestedInput
  }

  export type placesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    images?: placesUpdateimagesInput | string[]
    tags?: placesUpdatetagsInput | string[]
    opening_hours?: NullableJsonNullValueInput | InputJsonValue
    average_rating?: FloatFieldUpdateOperationsInput | number
    total_reviews?: IntFieldUpdateOperationsInput | number
    heat_score?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    googleMapsUri?: StringFieldUpdateOperationsInput | string
    websiteUri?: StringFieldUpdateOperationsInput | string
    nationalPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    internationalPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    take_out?: BoolFieldUpdateOperationsInput | boolean
    delivery?: BoolFieldUpdateOperationsInput | boolean
    dine_in?: BoolFieldUpdateOperationsInput | boolean
    reservable?: BoolFieldUpdateOperationsInput | boolean
    serves_breakfast?: BoolFieldUpdateOperationsInput | boolean
    serves_lunch?: BoolFieldUpdateOperationsInput | boolean
    serves_dinner?: BoolFieldUpdateOperationsInput | boolean
    serves_beer?: BoolFieldUpdateOperationsInput | boolean
    serves_wine?: BoolFieldUpdateOperationsInput | boolean
    serves_brunch?: BoolFieldUpdateOperationsInput | boolean
    serves_vegetarian_food?: BoolFieldUpdateOperationsInput | boolean
    outdoor_seating?: BoolFieldUpdateOperationsInput | boolean
    live_music?: BoolFieldUpdateOperationsInput | boolean
    menu_for_children?: BoolFieldUpdateOperationsInput | boolean
    serves_cocktails?: BoolFieldUpdateOperationsInput | boolean
    serves_dessert?: BoolFieldUpdateOperationsInput | boolean
    serves_coffee?: BoolFieldUpdateOperationsInput | boolean
    good_for_children?: BoolFieldUpdateOperationsInput | boolean
    restroom?: BoolFieldUpdateOperationsInput | boolean
    good_for_groups?: BoolFieldUpdateOperationsInput | boolean
    good_for_watching_sports?: BoolFieldUpdateOperationsInput | boolean
    priceLevel?: StringFieldUpdateOperationsInput | string
    timeZone?: StringFieldUpdateOperationsInput | string
    acceptsCreditCards?: BoolFieldUpdateOperationsInput | boolean
    acceptsDebitCards?: BoolFieldUpdateOperationsInput | boolean
    acceptsCashOnly?: BoolFieldUpdateOperationsInput | boolean
    acceptsNfc?: BoolFieldUpdateOperationsInput | boolean
    freeParkingLot?: BoolFieldUpdateOperationsInput | boolean
    freeStreetParking?: BoolFieldUpdateOperationsInput | boolean
    paidParkingLot?: BoolFieldUpdateOperationsInput | boolean
    valetParking?: BoolFieldUpdateOperationsInput | boolean
    wheelchairAccessibleParking?: BoolFieldUpdateOperationsInput | boolean
    wheelchairAccessibleEntrance?: BoolFieldUpdateOperationsInput | boolean
    wheelchairAccessibleRestroom?: BoolFieldUpdateOperationsInput | boolean
    wheelchairAccessibleSeating?: BoolFieldUpdateOperationsInput | boolean
    directionsUri?: StringFieldUpdateOperationsInput | string
    placeUri?: StringFieldUpdateOperationsInput | string
    writeAReviewUri?: StringFieldUpdateOperationsInput | string
    reviewsUri?: StringFieldUpdateOperationsInput | string
    photosUri?: StringFieldUpdateOperationsInput | string
    google_average_rating?: FloatFieldUpdateOperationsInput | number
    google_total_reviews?: IntFieldUpdateOperationsInput | number
    reviews?: reviewsUncheckedUpdateManyWithoutPlaceNestedInput
  }

  export type placesCreateManyInput = {
    id?: string
    name: string
    description: string
    category: string
    latitude: number
    longitude: number
    address: string
    city: string
    images?: placesCreateimagesInput | string[]
    tags?: placesCreatetagsInput | string[]
    opening_hours?: NullableJsonNullValueInput | InputJsonValue
    average_rating?: number
    total_reviews?: number
    heat_score?: number
    created_at?: Date | string
    updated_at?: Date | string
    googleMapsUri?: string
    websiteUri?: string
    nationalPhoneNumber?: string | null
    internationalPhoneNumber?: string | null
    take_out?: boolean
    delivery?: boolean
    dine_in?: boolean
    reservable?: boolean
    serves_breakfast?: boolean
    serves_lunch?: boolean
    serves_dinner?: boolean
    serves_beer?: boolean
    serves_wine?: boolean
    serves_brunch?: boolean
    serves_vegetarian_food?: boolean
    outdoor_seating?: boolean
    live_music?: boolean
    menu_for_children?: boolean
    serves_cocktails?: boolean
    serves_dessert?: boolean
    serves_coffee?: boolean
    good_for_children?: boolean
    restroom?: boolean
    good_for_groups?: boolean
    good_for_watching_sports?: boolean
    priceLevel?: string
    timeZone?: string
    acceptsCreditCards?: boolean
    acceptsDebitCards?: boolean
    acceptsCashOnly?: boolean
    acceptsNfc?: boolean
    freeParkingLot?: boolean
    freeStreetParking?: boolean
    paidParkingLot?: boolean
    valetParking?: boolean
    wheelchairAccessibleParking?: boolean
    wheelchairAccessibleEntrance?: boolean
    wheelchairAccessibleRestroom?: boolean
    wheelchairAccessibleSeating?: boolean
    directionsUri?: string
    placeUri?: string
    writeAReviewUri?: string
    reviewsUri?: string
    photosUri?: string
    google_average_rating?: number
    google_total_reviews?: number
  }

  export type placesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    images?: placesUpdateimagesInput | string[]
    tags?: placesUpdatetagsInput | string[]
    opening_hours?: NullableJsonNullValueInput | InputJsonValue
    average_rating?: FloatFieldUpdateOperationsInput | number
    total_reviews?: IntFieldUpdateOperationsInput | number
    heat_score?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    googleMapsUri?: StringFieldUpdateOperationsInput | string
    websiteUri?: StringFieldUpdateOperationsInput | string
    nationalPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    internationalPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    take_out?: BoolFieldUpdateOperationsInput | boolean
    delivery?: BoolFieldUpdateOperationsInput | boolean
    dine_in?: BoolFieldUpdateOperationsInput | boolean
    reservable?: BoolFieldUpdateOperationsInput | boolean
    serves_breakfast?: BoolFieldUpdateOperationsInput | boolean
    serves_lunch?: BoolFieldUpdateOperationsInput | boolean
    serves_dinner?: BoolFieldUpdateOperationsInput | boolean
    serves_beer?: BoolFieldUpdateOperationsInput | boolean
    serves_wine?: BoolFieldUpdateOperationsInput | boolean
    serves_brunch?: BoolFieldUpdateOperationsInput | boolean
    serves_vegetarian_food?: BoolFieldUpdateOperationsInput | boolean
    outdoor_seating?: BoolFieldUpdateOperationsInput | boolean
    live_music?: BoolFieldUpdateOperationsInput | boolean
    menu_for_children?: BoolFieldUpdateOperationsInput | boolean
    serves_cocktails?: BoolFieldUpdateOperationsInput | boolean
    serves_dessert?: BoolFieldUpdateOperationsInput | boolean
    serves_coffee?: BoolFieldUpdateOperationsInput | boolean
    good_for_children?: BoolFieldUpdateOperationsInput | boolean
    restroom?: BoolFieldUpdateOperationsInput | boolean
    good_for_groups?: BoolFieldUpdateOperationsInput | boolean
    good_for_watching_sports?: BoolFieldUpdateOperationsInput | boolean
    priceLevel?: StringFieldUpdateOperationsInput | string
    timeZone?: StringFieldUpdateOperationsInput | string
    acceptsCreditCards?: BoolFieldUpdateOperationsInput | boolean
    acceptsDebitCards?: BoolFieldUpdateOperationsInput | boolean
    acceptsCashOnly?: BoolFieldUpdateOperationsInput | boolean
    acceptsNfc?: BoolFieldUpdateOperationsInput | boolean
    freeParkingLot?: BoolFieldUpdateOperationsInput | boolean
    freeStreetParking?: BoolFieldUpdateOperationsInput | boolean
    paidParkingLot?: BoolFieldUpdateOperationsInput | boolean
    valetParking?: BoolFieldUpdateOperationsInput | boolean
    wheelchairAccessibleParking?: BoolFieldUpdateOperationsInput | boolean
    wheelchairAccessibleEntrance?: BoolFieldUpdateOperationsInput | boolean
    wheelchairAccessibleRestroom?: BoolFieldUpdateOperationsInput | boolean
    wheelchairAccessibleSeating?: BoolFieldUpdateOperationsInput | boolean
    directionsUri?: StringFieldUpdateOperationsInput | string
    placeUri?: StringFieldUpdateOperationsInput | string
    writeAReviewUri?: StringFieldUpdateOperationsInput | string
    reviewsUri?: StringFieldUpdateOperationsInput | string
    photosUri?: StringFieldUpdateOperationsInput | string
    google_average_rating?: FloatFieldUpdateOperationsInput | number
    google_total_reviews?: IntFieldUpdateOperationsInput | number
  }

  export type placesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    images?: placesUpdateimagesInput | string[]
    tags?: placesUpdatetagsInput | string[]
    opening_hours?: NullableJsonNullValueInput | InputJsonValue
    average_rating?: FloatFieldUpdateOperationsInput | number
    total_reviews?: IntFieldUpdateOperationsInput | number
    heat_score?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    googleMapsUri?: StringFieldUpdateOperationsInput | string
    websiteUri?: StringFieldUpdateOperationsInput | string
    nationalPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    internationalPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    take_out?: BoolFieldUpdateOperationsInput | boolean
    delivery?: BoolFieldUpdateOperationsInput | boolean
    dine_in?: BoolFieldUpdateOperationsInput | boolean
    reservable?: BoolFieldUpdateOperationsInput | boolean
    serves_breakfast?: BoolFieldUpdateOperationsInput | boolean
    serves_lunch?: BoolFieldUpdateOperationsInput | boolean
    serves_dinner?: BoolFieldUpdateOperationsInput | boolean
    serves_beer?: BoolFieldUpdateOperationsInput | boolean
    serves_wine?: BoolFieldUpdateOperationsInput | boolean
    serves_brunch?: BoolFieldUpdateOperationsInput | boolean
    serves_vegetarian_food?: BoolFieldUpdateOperationsInput | boolean
    outdoor_seating?: BoolFieldUpdateOperationsInput | boolean
    live_music?: BoolFieldUpdateOperationsInput | boolean
    menu_for_children?: BoolFieldUpdateOperationsInput | boolean
    serves_cocktails?: BoolFieldUpdateOperationsInput | boolean
    serves_dessert?: BoolFieldUpdateOperationsInput | boolean
    serves_coffee?: BoolFieldUpdateOperationsInput | boolean
    good_for_children?: BoolFieldUpdateOperationsInput | boolean
    restroom?: BoolFieldUpdateOperationsInput | boolean
    good_for_groups?: BoolFieldUpdateOperationsInput | boolean
    good_for_watching_sports?: BoolFieldUpdateOperationsInput | boolean
    priceLevel?: StringFieldUpdateOperationsInput | string
    timeZone?: StringFieldUpdateOperationsInput | string
    acceptsCreditCards?: BoolFieldUpdateOperationsInput | boolean
    acceptsDebitCards?: BoolFieldUpdateOperationsInput | boolean
    acceptsCashOnly?: BoolFieldUpdateOperationsInput | boolean
    acceptsNfc?: BoolFieldUpdateOperationsInput | boolean
    freeParkingLot?: BoolFieldUpdateOperationsInput | boolean
    freeStreetParking?: BoolFieldUpdateOperationsInput | boolean
    paidParkingLot?: BoolFieldUpdateOperationsInput | boolean
    valetParking?: BoolFieldUpdateOperationsInput | boolean
    wheelchairAccessibleParking?: BoolFieldUpdateOperationsInput | boolean
    wheelchairAccessibleEntrance?: BoolFieldUpdateOperationsInput | boolean
    wheelchairAccessibleRestroom?: BoolFieldUpdateOperationsInput | boolean
    wheelchairAccessibleSeating?: BoolFieldUpdateOperationsInput | boolean
    directionsUri?: StringFieldUpdateOperationsInput | string
    placeUri?: StringFieldUpdateOperationsInput | string
    writeAReviewUri?: StringFieldUpdateOperationsInput | string
    reviewsUri?: StringFieldUpdateOperationsInput | string
    photosUri?: StringFieldUpdateOperationsInput | string
    google_average_rating?: FloatFieldUpdateOperationsInput | number
    google_total_reviews?: IntFieldUpdateOperationsInput | number
  }

  export type reviewsCreateInput = {
    id?: string
    rating: number
    comment?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    user: usersCreateNestedOneWithoutReviewsInput
    place: placesCreateNestedOneWithoutReviewsInput
  }

  export type reviewsUncheckedCreateInput = {
    id?: string
    user_id: string
    place_id: string
    rating: number
    comment?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type reviewsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: usersUpdateOneRequiredWithoutReviewsNestedInput
    place?: placesUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type reviewsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    place_id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type reviewsCreateManyInput = {
    id?: string
    user_id: string
    place_id: string
    rating: number
    comment?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type reviewsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type reviewsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    place_id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type User_preferencesListRelationFilter = {
    every?: user_preferencesWhereInput
    some?: user_preferencesWhereInput
    none?: user_preferencesWhereInput
  }

  export type ReviewsListRelationFilter = {
    every?: reviewsWhereInput
    some?: reviewsWhereInput
    none?: reviewsWhereInput
  }

  export type user_preferencesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type reviewsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usersCountOrderByAggregateInput = {
    id?: SortOrder
    auth_id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
    birth_date?: SortOrder
    explorer_type?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    id?: SortOrder
    auth_id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
    birth_date?: SortOrder
    explorer_type?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    id?: SortOrder
    auth_id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
    birth_date?: SortOrder
    explorer_type?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type UsersRelationFilter = {
    is?: usersWhereInput
    isNot?: usersWhereInput
  }

  export type user_preferencesUser_idCategoryCompoundUniqueInput = {
    user_id: string
    category: string
  }

  export type user_preferencesCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    category?: SortOrder
    interest_level?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type user_preferencesAvgOrderByAggregateInput = {
    interest_level?: SortOrder
  }

  export type user_preferencesMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    category?: SortOrder
    interest_level?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type user_preferencesMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    category?: SortOrder
    interest_level?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type user_preferencesSumOrderByAggregateInput = {
    interest_level?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type placesCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    address?: SortOrder
    city?: SortOrder
    images?: SortOrder
    tags?: SortOrder
    opening_hours?: SortOrder
    average_rating?: SortOrder
    total_reviews?: SortOrder
    heat_score?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    googleMapsUri?: SortOrder
    websiteUri?: SortOrder
    nationalPhoneNumber?: SortOrder
    internationalPhoneNumber?: SortOrder
    take_out?: SortOrder
    delivery?: SortOrder
    dine_in?: SortOrder
    reservable?: SortOrder
    serves_breakfast?: SortOrder
    serves_lunch?: SortOrder
    serves_dinner?: SortOrder
    serves_beer?: SortOrder
    serves_wine?: SortOrder
    serves_brunch?: SortOrder
    serves_vegetarian_food?: SortOrder
    outdoor_seating?: SortOrder
    live_music?: SortOrder
    menu_for_children?: SortOrder
    serves_cocktails?: SortOrder
    serves_dessert?: SortOrder
    serves_coffee?: SortOrder
    good_for_children?: SortOrder
    restroom?: SortOrder
    good_for_groups?: SortOrder
    good_for_watching_sports?: SortOrder
    priceLevel?: SortOrder
    timeZone?: SortOrder
    acceptsCreditCards?: SortOrder
    acceptsDebitCards?: SortOrder
    acceptsCashOnly?: SortOrder
    acceptsNfc?: SortOrder
    freeParkingLot?: SortOrder
    freeStreetParking?: SortOrder
    paidParkingLot?: SortOrder
    valetParking?: SortOrder
    wheelchairAccessibleParking?: SortOrder
    wheelchairAccessibleEntrance?: SortOrder
    wheelchairAccessibleRestroom?: SortOrder
    wheelchairAccessibleSeating?: SortOrder
    directionsUri?: SortOrder
    placeUri?: SortOrder
    writeAReviewUri?: SortOrder
    reviewsUri?: SortOrder
    photosUri?: SortOrder
    google_average_rating?: SortOrder
    google_total_reviews?: SortOrder
  }

  export type placesAvgOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
    average_rating?: SortOrder
    total_reviews?: SortOrder
    heat_score?: SortOrder
    google_average_rating?: SortOrder
    google_total_reviews?: SortOrder
  }

  export type placesMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    address?: SortOrder
    city?: SortOrder
    average_rating?: SortOrder
    total_reviews?: SortOrder
    heat_score?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    googleMapsUri?: SortOrder
    websiteUri?: SortOrder
    nationalPhoneNumber?: SortOrder
    internationalPhoneNumber?: SortOrder
    take_out?: SortOrder
    delivery?: SortOrder
    dine_in?: SortOrder
    reservable?: SortOrder
    serves_breakfast?: SortOrder
    serves_lunch?: SortOrder
    serves_dinner?: SortOrder
    serves_beer?: SortOrder
    serves_wine?: SortOrder
    serves_brunch?: SortOrder
    serves_vegetarian_food?: SortOrder
    outdoor_seating?: SortOrder
    live_music?: SortOrder
    menu_for_children?: SortOrder
    serves_cocktails?: SortOrder
    serves_dessert?: SortOrder
    serves_coffee?: SortOrder
    good_for_children?: SortOrder
    restroom?: SortOrder
    good_for_groups?: SortOrder
    good_for_watching_sports?: SortOrder
    priceLevel?: SortOrder
    timeZone?: SortOrder
    acceptsCreditCards?: SortOrder
    acceptsDebitCards?: SortOrder
    acceptsCashOnly?: SortOrder
    acceptsNfc?: SortOrder
    freeParkingLot?: SortOrder
    freeStreetParking?: SortOrder
    paidParkingLot?: SortOrder
    valetParking?: SortOrder
    wheelchairAccessibleParking?: SortOrder
    wheelchairAccessibleEntrance?: SortOrder
    wheelchairAccessibleRestroom?: SortOrder
    wheelchairAccessibleSeating?: SortOrder
    directionsUri?: SortOrder
    placeUri?: SortOrder
    writeAReviewUri?: SortOrder
    reviewsUri?: SortOrder
    photosUri?: SortOrder
    google_average_rating?: SortOrder
    google_total_reviews?: SortOrder
  }

  export type placesMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    address?: SortOrder
    city?: SortOrder
    average_rating?: SortOrder
    total_reviews?: SortOrder
    heat_score?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    googleMapsUri?: SortOrder
    websiteUri?: SortOrder
    nationalPhoneNumber?: SortOrder
    internationalPhoneNumber?: SortOrder
    take_out?: SortOrder
    delivery?: SortOrder
    dine_in?: SortOrder
    reservable?: SortOrder
    serves_breakfast?: SortOrder
    serves_lunch?: SortOrder
    serves_dinner?: SortOrder
    serves_beer?: SortOrder
    serves_wine?: SortOrder
    serves_brunch?: SortOrder
    serves_vegetarian_food?: SortOrder
    outdoor_seating?: SortOrder
    live_music?: SortOrder
    menu_for_children?: SortOrder
    serves_cocktails?: SortOrder
    serves_dessert?: SortOrder
    serves_coffee?: SortOrder
    good_for_children?: SortOrder
    restroom?: SortOrder
    good_for_groups?: SortOrder
    good_for_watching_sports?: SortOrder
    priceLevel?: SortOrder
    timeZone?: SortOrder
    acceptsCreditCards?: SortOrder
    acceptsDebitCards?: SortOrder
    acceptsCashOnly?: SortOrder
    acceptsNfc?: SortOrder
    freeParkingLot?: SortOrder
    freeStreetParking?: SortOrder
    paidParkingLot?: SortOrder
    valetParking?: SortOrder
    wheelchairAccessibleParking?: SortOrder
    wheelchairAccessibleEntrance?: SortOrder
    wheelchairAccessibleRestroom?: SortOrder
    wheelchairAccessibleSeating?: SortOrder
    directionsUri?: SortOrder
    placeUri?: SortOrder
    writeAReviewUri?: SortOrder
    reviewsUri?: SortOrder
    photosUri?: SortOrder
    google_average_rating?: SortOrder
    google_total_reviews?: SortOrder
  }

  export type placesSumOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
    average_rating?: SortOrder
    total_reviews?: SortOrder
    heat_score?: SortOrder
    google_average_rating?: SortOrder
    google_total_reviews?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type PlacesRelationFilter = {
    is?: placesWhereInput
    isNot?: placesWhereInput
  }

  export type reviewsUser_idPlace_idCompoundUniqueInput = {
    user_id: string
    place_id: string
  }

  export type reviewsCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    place_id?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type reviewsAvgOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type reviewsMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    place_id?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type reviewsMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    place_id?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type reviewsSumOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type user_preferencesCreateNestedManyWithoutUserInput = {
    create?: XOR<user_preferencesCreateWithoutUserInput, user_preferencesUncheckedCreateWithoutUserInput> | user_preferencesCreateWithoutUserInput[] | user_preferencesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: user_preferencesCreateOrConnectWithoutUserInput | user_preferencesCreateOrConnectWithoutUserInput[]
    createMany?: user_preferencesCreateManyUserInputEnvelope
    connect?: user_preferencesWhereUniqueInput | user_preferencesWhereUniqueInput[]
  }

  export type reviewsCreateNestedManyWithoutUserInput = {
    create?: XOR<reviewsCreateWithoutUserInput, reviewsUncheckedCreateWithoutUserInput> | reviewsCreateWithoutUserInput[] | reviewsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: reviewsCreateOrConnectWithoutUserInput | reviewsCreateOrConnectWithoutUserInput[]
    createMany?: reviewsCreateManyUserInputEnvelope
    connect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
  }

  export type user_preferencesUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<user_preferencesCreateWithoutUserInput, user_preferencesUncheckedCreateWithoutUserInput> | user_preferencesCreateWithoutUserInput[] | user_preferencesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: user_preferencesCreateOrConnectWithoutUserInput | user_preferencesCreateOrConnectWithoutUserInput[]
    createMany?: user_preferencesCreateManyUserInputEnvelope
    connect?: user_preferencesWhereUniqueInput | user_preferencesWhereUniqueInput[]
  }

  export type reviewsUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<reviewsCreateWithoutUserInput, reviewsUncheckedCreateWithoutUserInput> | reviewsCreateWithoutUserInput[] | reviewsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: reviewsCreateOrConnectWithoutUserInput | reviewsCreateOrConnectWithoutUserInput[]
    createMany?: reviewsCreateManyUserInputEnvelope
    connect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type user_preferencesUpdateManyWithoutUserNestedInput = {
    create?: XOR<user_preferencesCreateWithoutUserInput, user_preferencesUncheckedCreateWithoutUserInput> | user_preferencesCreateWithoutUserInput[] | user_preferencesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: user_preferencesCreateOrConnectWithoutUserInput | user_preferencesCreateOrConnectWithoutUserInput[]
    upsert?: user_preferencesUpsertWithWhereUniqueWithoutUserInput | user_preferencesUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: user_preferencesCreateManyUserInputEnvelope
    set?: user_preferencesWhereUniqueInput | user_preferencesWhereUniqueInput[]
    disconnect?: user_preferencesWhereUniqueInput | user_preferencesWhereUniqueInput[]
    delete?: user_preferencesWhereUniqueInput | user_preferencesWhereUniqueInput[]
    connect?: user_preferencesWhereUniqueInput | user_preferencesWhereUniqueInput[]
    update?: user_preferencesUpdateWithWhereUniqueWithoutUserInput | user_preferencesUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: user_preferencesUpdateManyWithWhereWithoutUserInput | user_preferencesUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: user_preferencesScalarWhereInput | user_preferencesScalarWhereInput[]
  }

  export type reviewsUpdateManyWithoutUserNestedInput = {
    create?: XOR<reviewsCreateWithoutUserInput, reviewsUncheckedCreateWithoutUserInput> | reviewsCreateWithoutUserInput[] | reviewsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: reviewsCreateOrConnectWithoutUserInput | reviewsCreateOrConnectWithoutUserInput[]
    upsert?: reviewsUpsertWithWhereUniqueWithoutUserInput | reviewsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: reviewsCreateManyUserInputEnvelope
    set?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    disconnect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    delete?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    connect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    update?: reviewsUpdateWithWhereUniqueWithoutUserInput | reviewsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: reviewsUpdateManyWithWhereWithoutUserInput | reviewsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: reviewsScalarWhereInput | reviewsScalarWhereInput[]
  }

  export type user_preferencesUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<user_preferencesCreateWithoutUserInput, user_preferencesUncheckedCreateWithoutUserInput> | user_preferencesCreateWithoutUserInput[] | user_preferencesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: user_preferencesCreateOrConnectWithoutUserInput | user_preferencesCreateOrConnectWithoutUserInput[]
    upsert?: user_preferencesUpsertWithWhereUniqueWithoutUserInput | user_preferencesUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: user_preferencesCreateManyUserInputEnvelope
    set?: user_preferencesWhereUniqueInput | user_preferencesWhereUniqueInput[]
    disconnect?: user_preferencesWhereUniqueInput | user_preferencesWhereUniqueInput[]
    delete?: user_preferencesWhereUniqueInput | user_preferencesWhereUniqueInput[]
    connect?: user_preferencesWhereUniqueInput | user_preferencesWhereUniqueInput[]
    update?: user_preferencesUpdateWithWhereUniqueWithoutUserInput | user_preferencesUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: user_preferencesUpdateManyWithWhereWithoutUserInput | user_preferencesUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: user_preferencesScalarWhereInput | user_preferencesScalarWhereInput[]
  }

  export type reviewsUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<reviewsCreateWithoutUserInput, reviewsUncheckedCreateWithoutUserInput> | reviewsCreateWithoutUserInput[] | reviewsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: reviewsCreateOrConnectWithoutUserInput | reviewsCreateOrConnectWithoutUserInput[]
    upsert?: reviewsUpsertWithWhereUniqueWithoutUserInput | reviewsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: reviewsCreateManyUserInputEnvelope
    set?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    disconnect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    delete?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    connect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    update?: reviewsUpdateWithWhereUniqueWithoutUserInput | reviewsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: reviewsUpdateManyWithWhereWithoutUserInput | reviewsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: reviewsScalarWhereInput | reviewsScalarWhereInput[]
  }

  export type usersCreateNestedOneWithoutPreferencesInput = {
    create?: XOR<usersCreateWithoutPreferencesInput, usersUncheckedCreateWithoutPreferencesInput>
    connectOrCreate?: usersCreateOrConnectWithoutPreferencesInput
    connect?: usersWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type usersUpdateOneRequiredWithoutPreferencesNestedInput = {
    create?: XOR<usersCreateWithoutPreferencesInput, usersUncheckedCreateWithoutPreferencesInput>
    connectOrCreate?: usersCreateOrConnectWithoutPreferencesInput
    upsert?: usersUpsertWithoutPreferencesInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutPreferencesInput, usersUpdateWithoutPreferencesInput>, usersUncheckedUpdateWithoutPreferencesInput>
  }

  export type placesCreateimagesInput = {
    set: string[]
  }

  export type placesCreatetagsInput = {
    set: string[]
  }

  export type reviewsCreateNestedManyWithoutPlaceInput = {
    create?: XOR<reviewsCreateWithoutPlaceInput, reviewsUncheckedCreateWithoutPlaceInput> | reviewsCreateWithoutPlaceInput[] | reviewsUncheckedCreateWithoutPlaceInput[]
    connectOrCreate?: reviewsCreateOrConnectWithoutPlaceInput | reviewsCreateOrConnectWithoutPlaceInput[]
    createMany?: reviewsCreateManyPlaceInputEnvelope
    connect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
  }

  export type reviewsUncheckedCreateNestedManyWithoutPlaceInput = {
    create?: XOR<reviewsCreateWithoutPlaceInput, reviewsUncheckedCreateWithoutPlaceInput> | reviewsCreateWithoutPlaceInput[] | reviewsUncheckedCreateWithoutPlaceInput[]
    connectOrCreate?: reviewsCreateOrConnectWithoutPlaceInput | reviewsCreateOrConnectWithoutPlaceInput[]
    createMany?: reviewsCreateManyPlaceInputEnvelope
    connect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type placesUpdateimagesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type placesUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type reviewsUpdateManyWithoutPlaceNestedInput = {
    create?: XOR<reviewsCreateWithoutPlaceInput, reviewsUncheckedCreateWithoutPlaceInput> | reviewsCreateWithoutPlaceInput[] | reviewsUncheckedCreateWithoutPlaceInput[]
    connectOrCreate?: reviewsCreateOrConnectWithoutPlaceInput | reviewsCreateOrConnectWithoutPlaceInput[]
    upsert?: reviewsUpsertWithWhereUniqueWithoutPlaceInput | reviewsUpsertWithWhereUniqueWithoutPlaceInput[]
    createMany?: reviewsCreateManyPlaceInputEnvelope
    set?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    disconnect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    delete?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    connect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    update?: reviewsUpdateWithWhereUniqueWithoutPlaceInput | reviewsUpdateWithWhereUniqueWithoutPlaceInput[]
    updateMany?: reviewsUpdateManyWithWhereWithoutPlaceInput | reviewsUpdateManyWithWhereWithoutPlaceInput[]
    deleteMany?: reviewsScalarWhereInput | reviewsScalarWhereInput[]
  }

  export type reviewsUncheckedUpdateManyWithoutPlaceNestedInput = {
    create?: XOR<reviewsCreateWithoutPlaceInput, reviewsUncheckedCreateWithoutPlaceInput> | reviewsCreateWithoutPlaceInput[] | reviewsUncheckedCreateWithoutPlaceInput[]
    connectOrCreate?: reviewsCreateOrConnectWithoutPlaceInput | reviewsCreateOrConnectWithoutPlaceInput[]
    upsert?: reviewsUpsertWithWhereUniqueWithoutPlaceInput | reviewsUpsertWithWhereUniqueWithoutPlaceInput[]
    createMany?: reviewsCreateManyPlaceInputEnvelope
    set?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    disconnect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    delete?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    connect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    update?: reviewsUpdateWithWhereUniqueWithoutPlaceInput | reviewsUpdateWithWhereUniqueWithoutPlaceInput[]
    updateMany?: reviewsUpdateManyWithWhereWithoutPlaceInput | reviewsUpdateManyWithWhereWithoutPlaceInput[]
    deleteMany?: reviewsScalarWhereInput | reviewsScalarWhereInput[]
  }

  export type usersCreateNestedOneWithoutReviewsInput = {
    create?: XOR<usersCreateWithoutReviewsInput, usersUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: usersCreateOrConnectWithoutReviewsInput
    connect?: usersWhereUniqueInput
  }

  export type placesCreateNestedOneWithoutReviewsInput = {
    create?: XOR<placesCreateWithoutReviewsInput, placesUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: placesCreateOrConnectWithoutReviewsInput
    connect?: placesWhereUniqueInput
  }

  export type usersUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<usersCreateWithoutReviewsInput, usersUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: usersCreateOrConnectWithoutReviewsInput
    upsert?: usersUpsertWithoutReviewsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutReviewsInput, usersUpdateWithoutReviewsInput>, usersUncheckedUpdateWithoutReviewsInput>
  }

  export type placesUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<placesCreateWithoutReviewsInput, placesUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: placesCreateOrConnectWithoutReviewsInput
    upsert?: placesUpsertWithoutReviewsInput
    connect?: placesWhereUniqueInput
    update?: XOR<XOR<placesUpdateToOneWithWhereWithoutReviewsInput, placesUpdateWithoutReviewsInput>, placesUncheckedUpdateWithoutReviewsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type user_preferencesCreateWithoutUserInput = {
    id?: string
    category: string
    interest_level: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type user_preferencesUncheckedCreateWithoutUserInput = {
    id?: string
    category: string
    interest_level: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type user_preferencesCreateOrConnectWithoutUserInput = {
    where: user_preferencesWhereUniqueInput
    create: XOR<user_preferencesCreateWithoutUserInput, user_preferencesUncheckedCreateWithoutUserInput>
  }

  export type user_preferencesCreateManyUserInputEnvelope = {
    data: user_preferencesCreateManyUserInput | user_preferencesCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type reviewsCreateWithoutUserInput = {
    id?: string
    rating: number
    comment?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    place: placesCreateNestedOneWithoutReviewsInput
  }

  export type reviewsUncheckedCreateWithoutUserInput = {
    id?: string
    place_id: string
    rating: number
    comment?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type reviewsCreateOrConnectWithoutUserInput = {
    where: reviewsWhereUniqueInput
    create: XOR<reviewsCreateWithoutUserInput, reviewsUncheckedCreateWithoutUserInput>
  }

  export type reviewsCreateManyUserInputEnvelope = {
    data: reviewsCreateManyUserInput | reviewsCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type user_preferencesUpsertWithWhereUniqueWithoutUserInput = {
    where: user_preferencesWhereUniqueInput
    update: XOR<user_preferencesUpdateWithoutUserInput, user_preferencesUncheckedUpdateWithoutUserInput>
    create: XOR<user_preferencesCreateWithoutUserInput, user_preferencesUncheckedCreateWithoutUserInput>
  }

  export type user_preferencesUpdateWithWhereUniqueWithoutUserInput = {
    where: user_preferencesWhereUniqueInput
    data: XOR<user_preferencesUpdateWithoutUserInput, user_preferencesUncheckedUpdateWithoutUserInput>
  }

  export type user_preferencesUpdateManyWithWhereWithoutUserInput = {
    where: user_preferencesScalarWhereInput
    data: XOR<user_preferencesUpdateManyMutationInput, user_preferencesUncheckedUpdateManyWithoutUserInput>
  }

  export type user_preferencesScalarWhereInput = {
    AND?: user_preferencesScalarWhereInput | user_preferencesScalarWhereInput[]
    OR?: user_preferencesScalarWhereInput[]
    NOT?: user_preferencesScalarWhereInput | user_preferencesScalarWhereInput[]
    id?: StringFilter<"user_preferences"> | string
    user_id?: StringFilter<"user_preferences"> | string
    category?: StringFilter<"user_preferences"> | string
    interest_level?: IntFilter<"user_preferences"> | number
    created_at?: DateTimeFilter<"user_preferences"> | Date | string
    updated_at?: DateTimeFilter<"user_preferences"> | Date | string
  }

  export type reviewsUpsertWithWhereUniqueWithoutUserInput = {
    where: reviewsWhereUniqueInput
    update: XOR<reviewsUpdateWithoutUserInput, reviewsUncheckedUpdateWithoutUserInput>
    create: XOR<reviewsCreateWithoutUserInput, reviewsUncheckedCreateWithoutUserInput>
  }

  export type reviewsUpdateWithWhereUniqueWithoutUserInput = {
    where: reviewsWhereUniqueInput
    data: XOR<reviewsUpdateWithoutUserInput, reviewsUncheckedUpdateWithoutUserInput>
  }

  export type reviewsUpdateManyWithWhereWithoutUserInput = {
    where: reviewsScalarWhereInput
    data: XOR<reviewsUpdateManyMutationInput, reviewsUncheckedUpdateManyWithoutUserInput>
  }

  export type reviewsScalarWhereInput = {
    AND?: reviewsScalarWhereInput | reviewsScalarWhereInput[]
    OR?: reviewsScalarWhereInput[]
    NOT?: reviewsScalarWhereInput | reviewsScalarWhereInput[]
    id?: StringFilter<"reviews"> | string
    user_id?: StringFilter<"reviews"> | string
    place_id?: StringFilter<"reviews"> | string
    rating?: IntFilter<"reviews"> | number
    comment?: StringNullableFilter<"reviews"> | string | null
    created_at?: DateTimeFilter<"reviews"> | Date | string
    updated_at?: DateTimeFilter<"reviews"> | Date | string
  }

  export type usersCreateWithoutPreferencesInput = {
    id?: string
    auth_id: string
    first_name: string
    last_name: string
    email: string
    birth_date: Date | string
    explorer_type?: string
    created_at?: Date | string
    updated_at?: Date | string
    reviews?: reviewsCreateNestedManyWithoutUserInput
  }

  export type usersUncheckedCreateWithoutPreferencesInput = {
    id?: string
    auth_id: string
    first_name: string
    last_name: string
    email: string
    birth_date: Date | string
    explorer_type?: string
    created_at?: Date | string
    updated_at?: Date | string
    reviews?: reviewsUncheckedCreateNestedManyWithoutUserInput
  }

  export type usersCreateOrConnectWithoutPreferencesInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutPreferencesInput, usersUncheckedCreateWithoutPreferencesInput>
  }

  export type usersUpsertWithoutPreferencesInput = {
    update: XOR<usersUpdateWithoutPreferencesInput, usersUncheckedUpdateWithoutPreferencesInput>
    create: XOR<usersCreateWithoutPreferencesInput, usersUncheckedCreateWithoutPreferencesInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutPreferencesInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutPreferencesInput, usersUncheckedUpdateWithoutPreferencesInput>
  }

  export type usersUpdateWithoutPreferencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    auth_id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    birth_date?: DateTimeFieldUpdateOperationsInput | Date | string
    explorer_type?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: reviewsUpdateManyWithoutUserNestedInput
  }

  export type usersUncheckedUpdateWithoutPreferencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    auth_id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    birth_date?: DateTimeFieldUpdateOperationsInput | Date | string
    explorer_type?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: reviewsUncheckedUpdateManyWithoutUserNestedInput
  }

  export type reviewsCreateWithoutPlaceInput = {
    id?: string
    rating: number
    comment?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    user: usersCreateNestedOneWithoutReviewsInput
  }

  export type reviewsUncheckedCreateWithoutPlaceInput = {
    id?: string
    user_id: string
    rating: number
    comment?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type reviewsCreateOrConnectWithoutPlaceInput = {
    where: reviewsWhereUniqueInput
    create: XOR<reviewsCreateWithoutPlaceInput, reviewsUncheckedCreateWithoutPlaceInput>
  }

  export type reviewsCreateManyPlaceInputEnvelope = {
    data: reviewsCreateManyPlaceInput | reviewsCreateManyPlaceInput[]
    skipDuplicates?: boolean
  }

  export type reviewsUpsertWithWhereUniqueWithoutPlaceInput = {
    where: reviewsWhereUniqueInput
    update: XOR<reviewsUpdateWithoutPlaceInput, reviewsUncheckedUpdateWithoutPlaceInput>
    create: XOR<reviewsCreateWithoutPlaceInput, reviewsUncheckedCreateWithoutPlaceInput>
  }

  export type reviewsUpdateWithWhereUniqueWithoutPlaceInput = {
    where: reviewsWhereUniqueInput
    data: XOR<reviewsUpdateWithoutPlaceInput, reviewsUncheckedUpdateWithoutPlaceInput>
  }

  export type reviewsUpdateManyWithWhereWithoutPlaceInput = {
    where: reviewsScalarWhereInput
    data: XOR<reviewsUpdateManyMutationInput, reviewsUncheckedUpdateManyWithoutPlaceInput>
  }

  export type usersCreateWithoutReviewsInput = {
    id?: string
    auth_id: string
    first_name: string
    last_name: string
    email: string
    birth_date: Date | string
    explorer_type?: string
    created_at?: Date | string
    updated_at?: Date | string
    preferences?: user_preferencesCreateNestedManyWithoutUserInput
  }

  export type usersUncheckedCreateWithoutReviewsInput = {
    id?: string
    auth_id: string
    first_name: string
    last_name: string
    email: string
    birth_date: Date | string
    explorer_type?: string
    created_at?: Date | string
    updated_at?: Date | string
    preferences?: user_preferencesUncheckedCreateNestedManyWithoutUserInput
  }

  export type usersCreateOrConnectWithoutReviewsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutReviewsInput, usersUncheckedCreateWithoutReviewsInput>
  }

  export type placesCreateWithoutReviewsInput = {
    id?: string
    name: string
    description: string
    category: string
    latitude: number
    longitude: number
    address: string
    city: string
    images?: placesCreateimagesInput | string[]
    tags?: placesCreatetagsInput | string[]
    opening_hours?: NullableJsonNullValueInput | InputJsonValue
    average_rating?: number
    total_reviews?: number
    heat_score?: number
    created_at?: Date | string
    updated_at?: Date | string
    googleMapsUri?: string
    websiteUri?: string
    nationalPhoneNumber?: string | null
    internationalPhoneNumber?: string | null
    take_out?: boolean
    delivery?: boolean
    dine_in?: boolean
    reservable?: boolean
    serves_breakfast?: boolean
    serves_lunch?: boolean
    serves_dinner?: boolean
    serves_beer?: boolean
    serves_wine?: boolean
    serves_brunch?: boolean
    serves_vegetarian_food?: boolean
    outdoor_seating?: boolean
    live_music?: boolean
    menu_for_children?: boolean
    serves_cocktails?: boolean
    serves_dessert?: boolean
    serves_coffee?: boolean
    good_for_children?: boolean
    restroom?: boolean
    good_for_groups?: boolean
    good_for_watching_sports?: boolean
    priceLevel?: string
    timeZone?: string
    acceptsCreditCards?: boolean
    acceptsDebitCards?: boolean
    acceptsCashOnly?: boolean
    acceptsNfc?: boolean
    freeParkingLot?: boolean
    freeStreetParking?: boolean
    paidParkingLot?: boolean
    valetParking?: boolean
    wheelchairAccessibleParking?: boolean
    wheelchairAccessibleEntrance?: boolean
    wheelchairAccessibleRestroom?: boolean
    wheelchairAccessibleSeating?: boolean
    directionsUri?: string
    placeUri?: string
    writeAReviewUri?: string
    reviewsUri?: string
    photosUri?: string
    google_average_rating?: number
    google_total_reviews?: number
  }

  export type placesUncheckedCreateWithoutReviewsInput = {
    id?: string
    name: string
    description: string
    category: string
    latitude: number
    longitude: number
    address: string
    city: string
    images?: placesCreateimagesInput | string[]
    tags?: placesCreatetagsInput | string[]
    opening_hours?: NullableJsonNullValueInput | InputJsonValue
    average_rating?: number
    total_reviews?: number
    heat_score?: number
    created_at?: Date | string
    updated_at?: Date | string
    googleMapsUri?: string
    websiteUri?: string
    nationalPhoneNumber?: string | null
    internationalPhoneNumber?: string | null
    take_out?: boolean
    delivery?: boolean
    dine_in?: boolean
    reservable?: boolean
    serves_breakfast?: boolean
    serves_lunch?: boolean
    serves_dinner?: boolean
    serves_beer?: boolean
    serves_wine?: boolean
    serves_brunch?: boolean
    serves_vegetarian_food?: boolean
    outdoor_seating?: boolean
    live_music?: boolean
    menu_for_children?: boolean
    serves_cocktails?: boolean
    serves_dessert?: boolean
    serves_coffee?: boolean
    good_for_children?: boolean
    restroom?: boolean
    good_for_groups?: boolean
    good_for_watching_sports?: boolean
    priceLevel?: string
    timeZone?: string
    acceptsCreditCards?: boolean
    acceptsDebitCards?: boolean
    acceptsCashOnly?: boolean
    acceptsNfc?: boolean
    freeParkingLot?: boolean
    freeStreetParking?: boolean
    paidParkingLot?: boolean
    valetParking?: boolean
    wheelchairAccessibleParking?: boolean
    wheelchairAccessibleEntrance?: boolean
    wheelchairAccessibleRestroom?: boolean
    wheelchairAccessibleSeating?: boolean
    directionsUri?: string
    placeUri?: string
    writeAReviewUri?: string
    reviewsUri?: string
    photosUri?: string
    google_average_rating?: number
    google_total_reviews?: number
  }

  export type placesCreateOrConnectWithoutReviewsInput = {
    where: placesWhereUniqueInput
    create: XOR<placesCreateWithoutReviewsInput, placesUncheckedCreateWithoutReviewsInput>
  }

  export type usersUpsertWithoutReviewsInput = {
    update: XOR<usersUpdateWithoutReviewsInput, usersUncheckedUpdateWithoutReviewsInput>
    create: XOR<usersCreateWithoutReviewsInput, usersUncheckedCreateWithoutReviewsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutReviewsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutReviewsInput, usersUncheckedUpdateWithoutReviewsInput>
  }

  export type usersUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    auth_id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    birth_date?: DateTimeFieldUpdateOperationsInput | Date | string
    explorer_type?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    preferences?: user_preferencesUpdateManyWithoutUserNestedInput
  }

  export type usersUncheckedUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    auth_id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    birth_date?: DateTimeFieldUpdateOperationsInput | Date | string
    explorer_type?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    preferences?: user_preferencesUncheckedUpdateManyWithoutUserNestedInput
  }

  export type placesUpsertWithoutReviewsInput = {
    update: XOR<placesUpdateWithoutReviewsInput, placesUncheckedUpdateWithoutReviewsInput>
    create: XOR<placesCreateWithoutReviewsInput, placesUncheckedCreateWithoutReviewsInput>
    where?: placesWhereInput
  }

  export type placesUpdateToOneWithWhereWithoutReviewsInput = {
    where?: placesWhereInput
    data: XOR<placesUpdateWithoutReviewsInput, placesUncheckedUpdateWithoutReviewsInput>
  }

  export type placesUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    images?: placesUpdateimagesInput | string[]
    tags?: placesUpdatetagsInput | string[]
    opening_hours?: NullableJsonNullValueInput | InputJsonValue
    average_rating?: FloatFieldUpdateOperationsInput | number
    total_reviews?: IntFieldUpdateOperationsInput | number
    heat_score?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    googleMapsUri?: StringFieldUpdateOperationsInput | string
    websiteUri?: StringFieldUpdateOperationsInput | string
    nationalPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    internationalPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    take_out?: BoolFieldUpdateOperationsInput | boolean
    delivery?: BoolFieldUpdateOperationsInput | boolean
    dine_in?: BoolFieldUpdateOperationsInput | boolean
    reservable?: BoolFieldUpdateOperationsInput | boolean
    serves_breakfast?: BoolFieldUpdateOperationsInput | boolean
    serves_lunch?: BoolFieldUpdateOperationsInput | boolean
    serves_dinner?: BoolFieldUpdateOperationsInput | boolean
    serves_beer?: BoolFieldUpdateOperationsInput | boolean
    serves_wine?: BoolFieldUpdateOperationsInput | boolean
    serves_brunch?: BoolFieldUpdateOperationsInput | boolean
    serves_vegetarian_food?: BoolFieldUpdateOperationsInput | boolean
    outdoor_seating?: BoolFieldUpdateOperationsInput | boolean
    live_music?: BoolFieldUpdateOperationsInput | boolean
    menu_for_children?: BoolFieldUpdateOperationsInput | boolean
    serves_cocktails?: BoolFieldUpdateOperationsInput | boolean
    serves_dessert?: BoolFieldUpdateOperationsInput | boolean
    serves_coffee?: BoolFieldUpdateOperationsInput | boolean
    good_for_children?: BoolFieldUpdateOperationsInput | boolean
    restroom?: BoolFieldUpdateOperationsInput | boolean
    good_for_groups?: BoolFieldUpdateOperationsInput | boolean
    good_for_watching_sports?: BoolFieldUpdateOperationsInput | boolean
    priceLevel?: StringFieldUpdateOperationsInput | string
    timeZone?: StringFieldUpdateOperationsInput | string
    acceptsCreditCards?: BoolFieldUpdateOperationsInput | boolean
    acceptsDebitCards?: BoolFieldUpdateOperationsInput | boolean
    acceptsCashOnly?: BoolFieldUpdateOperationsInput | boolean
    acceptsNfc?: BoolFieldUpdateOperationsInput | boolean
    freeParkingLot?: BoolFieldUpdateOperationsInput | boolean
    freeStreetParking?: BoolFieldUpdateOperationsInput | boolean
    paidParkingLot?: BoolFieldUpdateOperationsInput | boolean
    valetParking?: BoolFieldUpdateOperationsInput | boolean
    wheelchairAccessibleParking?: BoolFieldUpdateOperationsInput | boolean
    wheelchairAccessibleEntrance?: BoolFieldUpdateOperationsInput | boolean
    wheelchairAccessibleRestroom?: BoolFieldUpdateOperationsInput | boolean
    wheelchairAccessibleSeating?: BoolFieldUpdateOperationsInput | boolean
    directionsUri?: StringFieldUpdateOperationsInput | string
    placeUri?: StringFieldUpdateOperationsInput | string
    writeAReviewUri?: StringFieldUpdateOperationsInput | string
    reviewsUri?: StringFieldUpdateOperationsInput | string
    photosUri?: StringFieldUpdateOperationsInput | string
    google_average_rating?: FloatFieldUpdateOperationsInput | number
    google_total_reviews?: IntFieldUpdateOperationsInput | number
  }

  export type placesUncheckedUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    images?: placesUpdateimagesInput | string[]
    tags?: placesUpdatetagsInput | string[]
    opening_hours?: NullableJsonNullValueInput | InputJsonValue
    average_rating?: FloatFieldUpdateOperationsInput | number
    total_reviews?: IntFieldUpdateOperationsInput | number
    heat_score?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    googleMapsUri?: StringFieldUpdateOperationsInput | string
    websiteUri?: StringFieldUpdateOperationsInput | string
    nationalPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    internationalPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    take_out?: BoolFieldUpdateOperationsInput | boolean
    delivery?: BoolFieldUpdateOperationsInput | boolean
    dine_in?: BoolFieldUpdateOperationsInput | boolean
    reservable?: BoolFieldUpdateOperationsInput | boolean
    serves_breakfast?: BoolFieldUpdateOperationsInput | boolean
    serves_lunch?: BoolFieldUpdateOperationsInput | boolean
    serves_dinner?: BoolFieldUpdateOperationsInput | boolean
    serves_beer?: BoolFieldUpdateOperationsInput | boolean
    serves_wine?: BoolFieldUpdateOperationsInput | boolean
    serves_brunch?: BoolFieldUpdateOperationsInput | boolean
    serves_vegetarian_food?: BoolFieldUpdateOperationsInput | boolean
    outdoor_seating?: BoolFieldUpdateOperationsInput | boolean
    live_music?: BoolFieldUpdateOperationsInput | boolean
    menu_for_children?: BoolFieldUpdateOperationsInput | boolean
    serves_cocktails?: BoolFieldUpdateOperationsInput | boolean
    serves_dessert?: BoolFieldUpdateOperationsInput | boolean
    serves_coffee?: BoolFieldUpdateOperationsInput | boolean
    good_for_children?: BoolFieldUpdateOperationsInput | boolean
    restroom?: BoolFieldUpdateOperationsInput | boolean
    good_for_groups?: BoolFieldUpdateOperationsInput | boolean
    good_for_watching_sports?: BoolFieldUpdateOperationsInput | boolean
    priceLevel?: StringFieldUpdateOperationsInput | string
    timeZone?: StringFieldUpdateOperationsInput | string
    acceptsCreditCards?: BoolFieldUpdateOperationsInput | boolean
    acceptsDebitCards?: BoolFieldUpdateOperationsInput | boolean
    acceptsCashOnly?: BoolFieldUpdateOperationsInput | boolean
    acceptsNfc?: BoolFieldUpdateOperationsInput | boolean
    freeParkingLot?: BoolFieldUpdateOperationsInput | boolean
    freeStreetParking?: BoolFieldUpdateOperationsInput | boolean
    paidParkingLot?: BoolFieldUpdateOperationsInput | boolean
    valetParking?: BoolFieldUpdateOperationsInput | boolean
    wheelchairAccessibleParking?: BoolFieldUpdateOperationsInput | boolean
    wheelchairAccessibleEntrance?: BoolFieldUpdateOperationsInput | boolean
    wheelchairAccessibleRestroom?: BoolFieldUpdateOperationsInput | boolean
    wheelchairAccessibleSeating?: BoolFieldUpdateOperationsInput | boolean
    directionsUri?: StringFieldUpdateOperationsInput | string
    placeUri?: StringFieldUpdateOperationsInput | string
    writeAReviewUri?: StringFieldUpdateOperationsInput | string
    reviewsUri?: StringFieldUpdateOperationsInput | string
    photosUri?: StringFieldUpdateOperationsInput | string
    google_average_rating?: FloatFieldUpdateOperationsInput | number
    google_total_reviews?: IntFieldUpdateOperationsInput | number
  }

  export type user_preferencesCreateManyUserInput = {
    id?: string
    category: string
    interest_level: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type reviewsCreateManyUserInput = {
    id?: string
    place_id: string
    rating: number
    comment?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type user_preferencesUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    interest_level?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type user_preferencesUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    interest_level?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type user_preferencesUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    interest_level?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type reviewsUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    place?: placesUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type reviewsUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    place_id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type reviewsUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    place_id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type reviewsCreateManyPlaceInput = {
    id?: string
    user_id: string
    rating: number
    comment?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type reviewsUpdateWithoutPlaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: usersUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type reviewsUncheckedUpdateWithoutPlaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type reviewsUncheckedUpdateManyWithoutPlaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UsersCountOutputTypeDefaultArgs instead
     */
    export type UsersCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UsersCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PlacesCountOutputTypeDefaultArgs instead
     */
    export type PlacesCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PlacesCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use usersDefaultArgs instead
     */
    export type usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = usersDefaultArgs<ExtArgs>
    /**
     * @deprecated Use user_preferencesDefaultArgs instead
     */
    export type user_preferencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = user_preferencesDefaultArgs<ExtArgs>
    /**
     * @deprecated Use placesDefaultArgs instead
     */
    export type placesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = placesDefaultArgs<ExtArgs>
    /**
     * @deprecated Use reviewsDefaultArgs instead
     */
    export type reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = reviewsDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}